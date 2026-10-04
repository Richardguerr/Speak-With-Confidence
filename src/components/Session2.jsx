import { Editable, useContent } from '../lib/content.jsx'
import { usePersistentState } from '../lib/hooks.js'
import { Chips, Reveal, Section } from './Section.jsx'

export default function Session2() {
  const { content } = useContent()
  const s = content.session2

  return (
    <Section id="session-2" basePath="session2" image="session2">
      <Reveal className="purpose">
        <div>
          <Editable as="p" className="purpose__label" path="session2.purposeLabel" />
          <Editable as="p" className="purpose__body" path="session2.purpose" />
        </div>
      </Reveal>

      <div className="steps">
        {s.steps.map((step, i) => (
          <Reveal key={step.title} className="step" delay={i * 60}>
            <div className="step__aside">
              <div className="step__icon" aria-hidden="true">
                {step.icon}
              </div>
              <Editable as="span" className="step__num" path={`session2.steps.${i}.step`} />
            </div>

            <div>
              <Editable as="h3" className="step__title" path={`session2.steps.${i}.title`} />
              <Editable as="p" className="step__lead" path={`session2.steps.${i}.lead`} />

              {step.chips && !step.chipsLast && (
                <Chips items={step.chips} basePath={`session2.steps.${i}.chips`} />
              )}

              {step.subTitle && (
                <Editable
                  as="p"
                  className="step__subtitle"
                  path={`session2.steps.${i}.subTitle`}
                />
              )}

              {step.chips && step.chipsLast && (
                <Chips items={step.chips} basePath={`session2.steps.${i}.chips`} />
              )}

              {step.parts && (
                <div className="parts">
                  {step.parts.map((part, j) => (
                    <div key={part.title} className="part">
                      <Editable
                        as="div"
                        className="part__title"
                        path={`session2.steps.${i}.parts.${j}.title`}
                      />
                      <Editable
                        as="div"
                        className="part__body"
                        path={`session2.steps.${i}.parts.${j}.body`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {step.tip && (
                <div className="tip">
                  <Editable as="p" className="tip__title" path={`session2.steps.${i}.tipTitle`} />
                  <Editable as="p" className="tip__body" path={`session2.steps.${i}.tip`} />
                </div>
              )}
            </div>
          </Reveal>
        ))}

        <SelfAssessment />
      </div>
    </Section>
  )
}

function SelfAssessment() {
  const { content } = useContent()
  const sa = content.session2.selfAssessment
  const [feeling, setFeeling] = usePersistentState('swc:selfcheck:feeling', null)
  const [improve, setImprove] = usePersistentState('swc:selfcheck:improve', [])
  const [reflection, setReflection] = usePersistentState('swc:selfcheck:reflection', '')

  const toggleImprove = (label) =>
    setImprove((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label],
    )

  return (
    <Reveal className="step selfcheck">
      <div className="step__aside">
        <div className="step__icon" aria-hidden="true">
          {sa.icon}
        </div>
        <Editable as="span" className="step__num" path="session2.selfAssessment.step" />
      </div>

      <div>
        <Editable as="h3" className="step__title" path="session2.selfAssessment.title" />
        <Editable as="p" className="step__lead" path="session2.selfAssessment.lead" />

        <Editable
          as="p"
          className="selfcheck__question"
          path="session2.selfAssessment.feelingQuestion"
        />
        <div className="feelings">
          {sa.feelings.map((f, i) => (
            <button
              key={f.label}
              type="button"
              className={`feeling${feeling === f.label ? ' is-active' : ''}`}
              onClick={() => setFeeling(feeling === f.label ? null : f.label)}
              aria-pressed={feeling === f.label}
            >
              <span aria-hidden="true">{f.emoji}</span>
              <Editable as="span" path={`session2.selfAssessment.feelings.${i}.label`} />
            </button>
          ))}
        </div>

        <Editable
          as="p"
          className="selfcheck__question"
          path="session2.selfAssessment.improveQuestion"
        />
        <div className="improvements">
          {sa.improvements.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`toggle-chip${improve.includes(label) ? ' is-active' : ''}`}
              onClick={() => toggleImprove(label)}
              aria-pressed={improve.includes(label)}
            >
              <Editable as="span" path={`session2.selfAssessment.improvements.${i}`} />
            </button>
          ))}
        </div>

        <Editable
          as="p"
          className="selfcheck__question"
          path="session2.selfAssessment.reflectionQuestion"
        />
        <Editable as="p" className="card__body" path="session2.selfAssessment.reflectionPrompt" />
        <textarea
          className="reflection"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder={sa.reflectionPlaceholder}
          aria-label={sa.reflectionPrompt}
        />
        <p className="saved-hint">
          Your answers stay on this device only — nothing is sent anywhere.
        </p>
      </div>
    </Reveal>
  )
}
