import { Editable, useContent } from '../lib/content.jsx'
import { Reveal, Section } from './Section.jsx'

export default function Session1() {
  const { content } = useContent()
  const s = content.session1

  return (
    <Section id="session-1" basePath="session1" image="session1" alt>
      <Reveal className="purpose">
        <div>
          <Editable as="p" className="purpose__label" path="session1.purposeLabel" />
          <Editable as="p" className="purpose__body" path="session1.purpose" />
        </div>
      </Reveal>

      {s.stages.map((stage, i) => (
        <Reveal key={stage.title} className={`stage stage--${stage.tone}`} delay={i * 60}>
          <Editable as="span" className="stage__badge" path={`session1.stages.${i}.badge`} />
          <Editable as="h3" className="stage__title" path={`session1.stages.${i}.title`} />
          <Editable as="p" className="stage__lead" path={`session1.stages.${i}.lead`} />
          <Editable as="p" className="stage__body" path={`session1.stages.${i}.body`} />

          {stage.list && (
            <ul className="qlist">
              {stage.list.map((_, j) => (
                <li key={j}>
                  <Editable as="span" path={`session1.stages.${i}.list.${j}`} />
                </li>
              ))}
            </ul>
          )}

          {stage.steps && (
            <>
              <Editable
                as="p"
                className="stage__lead"
                path={`session1.stages.${i}.stepsTitle`}
                style={{ marginTop: '0.5rem' }}
              />
              <ol className="mission">
                {stage.steps.map((step, j) => (
                  <li key={step.title}>
                    <div>
                      <Editable
                        as="div"
                        className="mission__title"
                        path={`session1.stages.${i}.steps.${j}.title`}
                      />
                      <Editable
                        as="div"
                        className="mission__body"
                        path={`session1.stages.${i}.steps.${j}.body`}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}

          <div className="note">
            <Editable as="p" className="note__title" path={`session1.stages.${i}.noteTitle`} />
            <Editable as="p" className="note__body" path={`session1.stages.${i}.note`} />
          </div>
        </Reveal>
      ))}
    </Section>
  )
}
