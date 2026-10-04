import { Editable, useContent } from '../lib/content.jsx'
import { Reveal, Section } from './Section.jsx'

export default function Goals() {
  const { content } = useContent()

  return (
    <Section id="goals" basePath="goals" image="goals" alt>
      <div className="grid grid--4">
        {content.goals.items.map((goal, i) => (
          <Reveal key={goal.title} className="card goal" delay={i * 60}>
            <div className="card__icon" aria-hidden="true">
              {goal.icon}
            </div>
            <Editable as="h3" className="card__title" path={`goals.items.${i}.title`} />
            <Editable as="p" className="card__body" path={`goals.items.${i}.body`} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
