import { Editable, useContent } from '../lib/content.jsx'
import { Reveal, Section } from './Section.jsx'

export default function Game() {
  const { content } = useContent()
  const g = content.game

  return (
    <Section id="game" basePath="game" image="game">
      <Reveal style={{ maxWidth: '52rem', marginTop: '-1.5rem' }}>
        <Editable as="p" className="lead" path="game.intro" />
      </Reveal>

      <Reveal className="embed embed--game" delay={80}>
        <iframe
          src={g.embedUrl}
          title={g.embedTitle}
          loading="lazy"
          allowFullScreen
          allow="fullscreen; autoplay; allow-top-navigation-by-user-activation"
        />
      </Reveal>

      <Reveal className="embed__actions" delay={120}>
        <a className="btn btn--ghost" href={g.embedUrl} target="_blank" rel="noopener noreferrer">
          <span aria-hidden="true">↗</span>
          <Editable as="span" path="game.openLabel" />
        </a>
      </Reveal>
    </Section>
  )
}
