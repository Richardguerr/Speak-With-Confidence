import { useState } from 'react'
import { Editable, useContent } from '../lib/content.jsx'
import { Reveal, Route, Section } from './Section.jsx'

export default function Situations() {
  const { content } = useContent()
  const s = content.situations
  const [selected, setSelected] = useState(0)
  const current = s.items[selected] ?? s.items[0]

  return (
    <Section id="situations" basePath="situations" image="situations">
      <Reveal className="stack" style={{ maxWidth: '52rem', marginTop: '-1.5rem' }}>
        <Editable as="p" className="lead" path="situations.intro" />
        <Editable as="p" className="lead" path="situations.intro2" />
      </Reveal>

      <Reveal style={{ margin: 'clamp(1.6rem, 4vw, 2.4rem) 0' }}>
        <Editable as="p" className="hero__panel-label" path="situations.routeLabel" />
        <Route steps={s.route} basePath="situations.route" />
      </Reveal>

      <div className="situations__layout">
        <Reveal>
          <Editable
            as="p"
            className="hero__panel-label"
            path="situations.prompt"
            style={{ marginBottom: '0.9rem' }}
          />
          <div className="situation-list">
            {s.items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                className={`situation${selected === i ? ' is-active' : ''}`}
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
              >
                <span className="situation__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <Editable
                  as="span"
                  className="situation__title"
                  path={`situations.items.${i}.title`}
                />
                <span className="situation__hint" aria-hidden="true">
                  →
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="situation-detail" delay={100}>
          <div className="situation-detail__icon" aria-hidden="true">
            {current.icon}
          </div>
          <Editable
            as="h3"
            className="situation-detail__title"
            path={`situations.items.${selected}.title`}
          />
          <Editable
            as="p"
            className="situation-detail__body"
            path={`situations.items.${selected}.body`}
          />
          <Route steps={s.route} basePath="situations.route" />
        </Reveal>
      </div>
    </Section>
  )
}
