import { Editable, useContent } from '../lib/content.jsx'
import { Reveal, Section } from './Section.jsx'

export default function Project() {
  const { content } = useContent()
  const p = content.project

  return (
    <Section id="project" basePath="project" image="project">
      <Reveal className="stack" style={{ maxWidth: '52rem' }}>
        {p.paragraphs.map((_, i) => (
          <Editable key={i} as="p" className="lead" path={`project.paragraphs.${i}`} />
        ))}
      </Reveal>

      <Reveal className="grid grid--3" style={{ marginTop: 'clamp(2rem, 5vw, 3rem)' }}>
        {p.cards.map((card, i) => (
          <article key={card.title} className="card">
            <div className="card__icon" aria-hidden="true">
              {card.icon}
            </div>
            <Editable as="h3" className="card__title" path={`project.cards.${i}.title`} />
            <Editable as="p" className="card__body" path={`project.cards.${i}.body`} />
          </article>
        ))}
      </Reveal>

      <Reveal className="card" style={{ marginTop: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
        <Editable as="h3" className="card__title" path="project.approachTitle" />
        <Editable as="p" className="card__body" path="project.approachIntro" />
        <ul className="ticklist" style={{ marginTop: '1.1rem' }}>
          {p.approach.map((_, i) => (
            <li key={i}>
              <Editable as="span" path={`project.approach.${i}`} />
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
