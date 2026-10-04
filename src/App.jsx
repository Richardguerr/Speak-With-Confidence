import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Project from './components/Project.jsx'
import Goals from './components/Goals.jsx'
import Situations from './components/Situations.jsx'
import Session1 from './components/Session1.jsx'
import Game from './components/Game.jsx'
import Session2 from './components/Session2.jsx'
import Presentation from './components/Presentation.jsx'
import Connections from './components/Connections.jsx'
import Research from './components/Research.jsx'
import References from './components/References.jsx'
import Footer from './components/Footer.jsx'
// El botón flotante de edición está desactivado.
// Para volver a activarlo: descomenta la línea de abajo y la de <EditBar />.
// import EditBar from './components/EditBar.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Project />
        <Goals />
        <Situations />
        <Session1 />
        <Game />
        <Session2 />
        <Presentation />
        <Connections />
        <Research />
        <References />
      </main>
      <Footer />
      {/* <EditBar /> */}
    </>
  )
}
