import { useReveal } from '../lib/hooks.js'
import { Editable } from '../lib/content.jsx'
import { SECTION_IMAGES } from '../images/index.js'

/** A page section with the standard eyebrow + title header and its artwork. */
export function Section({ id, alt = false, basePath, image, children, head = true }) {
  const photo = image ? SECTION_IMAGES[image] : null

  return (
    <section id={id} className={`section${alt ? ' section--alt' : ''}`}>
      <div className="wrap">
        {head && (
          <div className={`section__top${photo ? ' section__top--art' : ''}`}>
            <Reveal className="section__head">
              <Editable as="p" className="eyebrow" path={`${basePath}.eyebrow`} />
              <Editable as="h2" className="section__title" path={`${basePath}.title`} />
            </Reveal>
            {photo && (
              <Reveal className="section__art" delay={120}>
                <img src={photo} alt="" loading="lazy" decoding="async" />
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

/** Wrapper that fades its children in on scroll. */
export function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  style,
  children,
  ...rest
}) {
  const ref = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms`, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** "Look → Listen → Play" style path. */
export function Route({ steps, basePath }) {
  return (
    <div className="route">
      {steps.map((step, i) => (
        <span key={`${step}-${i}`} style={{ display: 'contents' }}>
          <Editable as="span" className="route__step" path={`${basePath}.${i}`} />
          {i < steps.length - 1 && (
            <span className="route__arrow" aria-hidden="true">
              →
            </span>
          )}
        </span>
      ))}
    </div>
  )
}

/** Row of read-only chips bound to a content array. */
export function Chips({ items, basePath }) {
  return (
    <div className="chips">
      {items.map((item, i) => (
        <Editable key={`${item}-${i}`} className="chip" path={`${basePath}.${i}`} />
      ))}
    </div>
  )
}
