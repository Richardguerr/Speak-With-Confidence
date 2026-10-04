import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import defaultSite from '../content/site.js'

const STORAGE_KEY = 'swc:content:v1'

/* ── tiny get/set by path ("hero.title", "goals.items.0.body") ── */
export function getPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj)
}

function setPath(obj, path, value) {
  const keys = path.split('.')
  const clone = Array.isArray(obj) ? [...obj] : { ...obj }
  let cursor = clone
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const next = cursor[key]
    cursor[key] = Array.isArray(next) ? [...next] : { ...next }
    cursor = cursor[key]
  }
  cursor[keys[keys.length - 1]] = value
  return clone
}

function deepMerge(base, patch) {
  if (patch === undefined) return base
  if (Array.isArray(base) && Array.isArray(patch)) {
    return base.map((item, i) => (i in patch ? deepMerge(item, patch[i]) : item))
  }
  if (base && typeof base === 'object' && patch && typeof patch === 'object') {
    const out = Array.isArray(base) ? [...base] : { ...base }
    for (const key of Object.keys(patch)) out[key] = deepMerge(base[key], patch[key])
    return out
  }
  return patch
}

/* ── context ──────────────────────────────────────────────── */
const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? deepMerge(defaultSite, JSON.parse(raw)) : defaultSite
    } catch {
      return defaultSite
    }
  })
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('is-editing', editing)
  }, [editing])

  const update = useCallback((path, value) => {
    setContent((prev) => {
      if (getPath(prev, path) === value) return prev
      const next = setPath(prev, path, value)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        /* storage may be unavailable — keep the in-memory edit */
      }
      return next
    })
  }, [])

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    setContent(defaultSite)
  }, [])

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'site-content.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [content])

  const value = useMemo(
    () => ({ content, editing, setEditing, update, reset, exportJson }),
    [content, editing, update, reset, exportJson],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>')
  return ctx
}

/* ── <Editable> — renders text, editable in place in edit mode ── */
export function Editable({ path, as: Tag = 'span', className, children, ...rest }) {
  const { content, editing, update } = useContent()
  const ref = useRef(null)
  const text = children ?? getPath(content, path) ?? ''

  // Keep the DOM in sync only when not actively typing, so the caret
  // does not jump to the start on every keystroke.
  useEffect(() => {
    const el = ref.current
    if (el && document.activeElement !== el && el.textContent !== text) {
      el.textContent = text
    }
  }, [text, editing])

  if (!editing) {
    return (
      <Tag className={className} {...rest}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref}
      className={className}
      data-edit={path}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={(e) => update(path, e.currentTarget.textContent.trim())}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          e.currentTarget.blur()
        }
        if (e.key === 'Escape') e.currentTarget.blur()
      }}
      {...rest}
    >
      {text}
    </Tag>
  )
}
