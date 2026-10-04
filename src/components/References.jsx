import { Editable, useContent } from '../lib/content.jsx'
import { Reveal, Section } from './Section.jsx'

export default function References() {
  const { content } = useContent()

  return (
    <Section id="references" basePath="references" image="references" alt>
      <ol className="refs">
        {content.references.items.map((ref, i) => (
          <Reveal as="li" key={i} className="ref" delay={i * 30}>
            <div>
              <Editable as="span" path={`references.items.${i}.text`} />{' '}
              {ref.url && (
                <a href={ref.url} target="_blank" rel="noopener noreferrer">
                  {ref.url}
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
