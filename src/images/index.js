/**
 * ─────────────────────────────────────────────────────────────
 *  IMÁGENES DEL SITIO
 *  Las fotos viven en esta misma carpeta (src/images). Vite las
 *  optimiza y les pone un hash al compilar, por eso se importan
 *  en vez de escribir la ruta a mano.
 *
 *  ¿Quieres cambiar qué imagen va en qué sección?
 *  Cambia el valor en SECTION_IMAGES, abajo. Nada más.
 *
 *  ¿Agregar una imagen nueva?
 *  1. Déjala en src/images (por ejemplo 9.jpeg)
 *  2. Añade arriba:  import img9 from './9.jpeg'
 *  3. Úsala en SECTION_IMAGES:  research: img9,
 * ─────────────────────────────────────────────────────────────
 */

import img1 from './1.jpeg'
import img2 from './2.jpeg'
import img3 from './3.jpeg'
import img4 from './4.jpeg'
import img5 from './5.jpeg'
import img6 from './6.jpeg'
import img7 from './7.jpeg'
import img8 from './8.jpeg'

export const SECTION_IMAGES = {
  hero: img1, // ciudad neón — panel de la portada
  project: img2, // ciudad neón rosa
  goals: img4, // nivel púrpura
  situations: img5, // nivel azul
  session1: img8, // nivel verde
  game: img7, // nivel rojo neón
  session2: img3, // corazón de píxeles
  connections: img6, // nivel magenta
  // presentation, research y references no llevan foto:
  // ya tienen la presentación embebida, las tarjetas de estudios
  // y la lista de bibliografía como elemento visual.
}

export const ALL_IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8]

export default SECTION_IMAGES
