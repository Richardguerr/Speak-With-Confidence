import { Editable } from '../lib/content.jsx'
import { Reveal } from './Section.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <Reveal className="wrap">
        <Editable as="h2" className="footer__title" path="footer.title" />
        <Editable as="p" className="footer__subtitle" path="footer.subtitle" />
        <Editable as="p" className="footer__tagline" path="footer.tagline" />
      </Reveal>
    </footer>
  )
}
