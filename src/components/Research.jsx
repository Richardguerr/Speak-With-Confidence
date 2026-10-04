import { Editable, useContent } from '../lib/content.jsx'
import { Chips, Reveal, Section } from './Section.jsx'

export default function Research() {
  const { content } = useContent()
  const r = content.research

  return (
    <Section id="research" basePath="research" image="research">
      <Reveal className="stack" style={{ maxWidth: '52rem', marginTop: '-1.5rem' }}>
        <Editable as="p" className="lead" path="research.intro" />
        <Editable as="p" className="lead" path="research.intro2" />
      </Reveal>

      <div className="grid grid--3" style={{ marginTop: 'clamp(2rem, 5vw, 3rem)' }}>
        {r.studies.map((study, i) => (
          <Reveal key={study.label} className="card study" delay={i * 60}>
            <Editable as="span" className="study__label" path={`research.studies.${i}.label`} />
            <Editable as="h3" className="study__authors" path={`research.studies.${i}.authors`} />
            <Editable as="p" className="study__title" path={`research.studies.${i}.title`} />
            <Editable as="p" className="study__body" path={`research.studies.${i}.body`} />
          </Reveal>
        ))}
      </div>

      <Reveal className="finding">
        <Editable as="h3" className="finding__title" path="research.findingTitle" />
        <Editable as="p" className="card__body" path="research.findingLead" />
        <div className="finding__chips">
          <Chips items={r.findingChips} basePath="research.findingChips" />
        </div>
        <Editable as="p" className="card__body" path="research.findingBody" />
        <Editable as="p" className="finding__closing" path="research.findingClosing" />
      </Reveal>
    </Section>
  )
}
