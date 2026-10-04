import { useContent } from '../lib/content.jsx'

/**
 * Floating toolbar that turns the whole page into an editable document.
 * Changes are kept in this browser (localStorage) and can be exported as
 * JSON to paste back into src/content/site.js.
 */
export default function EditBar() {
  const { editing, setEditing, reset, exportJson } = useContent()

  return (
    <>
      {editing && (
        <p className="edit-banner">
          Click any text to edit it · Enter saves · Esc cancels the cursor
        </p>
      )}

      <div className="editbar">
        {editing && (
          <>
            <button type="button" className="editbar__btn" onClick={exportJson}>
              <span aria-hidden="true">⬇</span> Export JSON
            </button>
            <button
              type="button"
              className="editbar__btn"
              onClick={() => {
                if (window.confirm('Discard every edit and restore the original text?')) {
                  reset()
                }
              }}
            >
              <span aria-hidden="true">↺</span> Reset
            </button>
          </>
        )}

        <button
          type="button"
          className={`editbar__btn${editing ? ' editbar__btn--on' : ''}`}
          onClick={() => setEditing((v) => !v)}
          aria-pressed={editing}
        >
          <span aria-hidden="true">{editing ? '✓' : '✏️'}</span>
          {editing ? 'Done editing' : 'Edit content'}
        </button>
      </div>
    </>
  )
}
