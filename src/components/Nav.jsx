import { useEffect, useMemo, useState } from 'react'
import { useContent } from '../lib/content.jsx'
import { useActiveSection, useScrolled, useTheme } from '../lib/hooks.js'

export default function Nav() {
  const { content } = useContent()
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const [, toggleTheme] = useTheme()

  const ids = useMemo(() => content.nav.map((n) => n.id), [content.nav])
  const active = useActiveSection(ids)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="wrap nav__inner">
        <a className="nav__brand" href="#home" onClick={() => setOpen(false)}>
          <span aria-hidden="true">🗣️</span>
          {content.meta.title}
        </a>

        <nav className={`nav__links${open ? ' is-open' : ''}`} aria-label="Sections">
          {content.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav__link${active === item.id ? ' is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="Switch light / dark mode"
            title="Light / dark mode"
          >
            <span aria-hidden="true">🌓</span>
          </button>
          <button
            type="button"
            className="icon-btn nav__toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span aria-hidden="true">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
