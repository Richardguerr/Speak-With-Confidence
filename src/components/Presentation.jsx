import { Editable, useContent } from '../lib/content.jsx'
import { Reveal, Section } from './Section.jsx'

export default function Presentation() {
  const { content } = useContent()
  const p = content.presentation

  return (
    <Section id="presentation" basePath="presentation" image="presentation">
      <Reveal style={{ maxWidth: '52rem', marginTop: '-1.5rem' }}>
        <Editable as="p" className="lead" path="presentation.intro" />
      </Reveal>

      <Reveal className="embed" delay={80}>
        <iframe
          src={p.embedUrl}
          title={p.embedTitle}
          loading="lazy"
          allowFullScreen
          allow="fullscreen; autoplay; encrypted-media"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Reveal>

      <Reveal className="embed__actions" delay={120}>
        <a className="btn btn--ghost" href={p.embedUrl} target="_blank" rel="noopener noreferrer">
          <span aria-hidden="true">↗</span>
          <Editable as="span" path="presentation.openLabel" />
        </a>
      </Reveal>
    </Section>
  )
}
