import { Editable, useContent } from '../lib/content.jsx'
import { Reveal, Route } from './Section.jsx'
import { SECTION_IMAGES } from '../images/index.js'

export default function Hero() {
  const { content } = useContent()
  const hero = content.hero

  return (
    <section id="home" className="hero">
      <div className="wrap hero__inner">
        <Reveal>
          <Editable as="p" className="hero__kicker" path="hero.kicker" />
          <Editable as="h1" className="hero__title" path="hero.title" />
          <Editable as="p" className="hero__subtitle" path="hero.subtitle" />
          <Editable as="p" className="hero__text" path="hero.intro" />
          <Editable as="p" className="hero__text" path="hero.intro2" />
          <div className="hero__cta">
            <a className="btn btn--primary" href="#project">
              <Editable as="span" path="hero.ctaPrimary" />
              <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn--ghost" href="#situations">
              <span aria-hidden="true">🎧</span>
              <Editable as="span" path="hero.ctaSecondary" />
            </a>
          </div>
        </Reveal>

        <Reveal className="hero__panel" delay={120}>
          <div className="hero__panel-art">
            <img src={SECTION_IMAGES.hero} alt="" loading="eager" decoding="async" />
          </div>
          <Editable as="p" className="hero__panel-callout" path="hero.callout" />
          <p className="hero__panel-label">Our learning route</p>
          <Route steps={hero.route} basePath="hero.route" />
          <Editable as="p" className="hero__panel-closing" path="hero.closing" />
        </Reveal>
      </div>
    </section>
  )
}
