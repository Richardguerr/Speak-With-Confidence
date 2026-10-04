import { Editable, useContent } from '../lib/content.jsx'
import { Reveal, Section } from './Section.jsx'

export default function Connections() {
  const { content } = useContent()
  const c = content.connections

  return (
    <Section id="connections" basePath="connections" image="connections" alt>
      <Reveal style={{ maxWidth: '52rem', marginTop: '-1.5rem' }}>
        <Editable as="p" className="lead" path="connections.intro" />
      </Reveal>

      <div className="grid grid--4" style={{ marginTop: 'clamp(2rem, 5vw, 3rem)' }}>
        {c.areas.map((area, i) => (
          <Reveal key={area.title} className="card" delay={i * 70}>
            <div className="area__icon" aria-hidden="true">
              {area.icon}
            </div>
            <Editable as="h3" className="card__title" path={`connections.areas.${i}.title`} />
            <Editable as="p" className="area__lead" path={`connections.areas.${i}.lead`} />
            <ul className="ticklist">
              {area.list.map((_, j) => (
                <li key={j}>
                  <Editable as="span" path={`connections.areas.${i}.list.${j}`} />
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal className="banner">
        <Editable as="h3" className="banner__title" path="connections.bannerTitle" />
        <Editable as="p" className="banner__body" path="connections.bannerBody" />
      </Reveal>
    </Section>
  )
}
