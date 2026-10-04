# Speak with Confidence — English in Real Situations

Sitio web educativo (React + Vite) del proyecto *Speak with Confidence: English in Real
Situations*: una propuesta pedagógica para fortalecer la comprensión y la expresión oral
en inglés de estudiantes de básica secundaria mediante situaciones comunicativas reales y
el uso pedagógico de las TIC.

El contenido de la página está **en inglés** (como el trabajo original); esta guía está en
español.

---

## 1. Cómo correrlo en tu computador

```bash
npm install
```

```bash
npm run dev
```

Abre la dirección que aparece en la terminal (normalmente `http://localhost:5173`).

Otros comandos:

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve `dist/` para revisarlo antes de publicar |

---

## 2. Cómo editar el contenido (tres formas)

### a) Editando directamente en la página — la más fácil

1. Abre el sitio y haz clic en el botón **✏️ Edit content** (abajo a la derecha).
2. Haz clic sobre cualquier texto y escribe encima. `Enter` guarda, `Esc` suelta el cursor.
3. Los cambios quedan guardados en ese navegador automáticamente.
4. Para que los cambios sean permanentes para todo el mundo, pulsa **⬇ Export JSON**: se
   descarga `site-content.json`. Pega ese contenido dentro de `src/content/site.js`
   (reemplazando el objeto `site`) y vuelve a desplegar.
5. **↺ Reset** descarta todas las ediciones locales y vuelve al texto original.

> Las ediciones hechas en el navegador solo se ven en ese computador. El texto que ven
> todos los visitantes es siempre el de `src/content/site.js`.

### b) Editando el archivo de contenido

Todo el texto del sitio vive en un solo archivo:

```
src/content/site.js
```

Está organizado por secciones (`hero`, `project`, `goals`, `situations`, `session1`,
`session2`, `game`, `presentation`, `connections`, `research`, `references`, `footer`). Cambia cualquier texto
entre comillas y la página se actualiza sola mientras `npm run dev` esté corriendo.

Para **agregar** una tarjeta, una situación o una referencia, copia un bloque `{ ... }`
dentro de la lista correspondiente y cambia sus textos. No hay que tocar ningún componente.

### c) Cambiando el diseño (colores, tipografías, formas)

Los *design tokens* están en un solo archivo:

```
src/styles/theme.css
```

Allí se cambian de una vez para todo el sitio:

- `--brand`, `--accent` → colores principales
- `--start`, `--development`, `--closing` → colores de las etapas de la Sesión 1
- `--font-display`, `--font-body` → tipografías (si cambias de fuente, actualiza también el
  `<link>` de Google Fonts en `index.html`)
- `--radius`, `--shadow`, `--maxw`, `--section-y` → esquinas, sombras, ancho y aire

El modo oscuro ya está definido en el mismo archivo y hay un botón 🌓 en la barra superior.

Los estilos de cada componente están en `src/styles/global.css`.

### d) Cambiando las imágenes

Las fotos están en `src/images/`. Qué imagen va en qué sección se decide en un solo
archivo, `src/images/index.js`:

```js
export const SECTION_IMAGES = {
  hero: img1,
  project: img2,
  goals: img4,
  ...
}
```

Para **cambiar** una imagen de sección, intercambia el valor. Para **agregar** una nueva:
deja el archivo en `src/images/`, impórtalo arriba (`import img9 from './9.jpeg'`) y úsalo
en la lista.

Hoy hay 8 imágenes para 11 secciones. Las tres que no llevan foto son `presentation`,
`research` y `references`, porque ya tienen su propio elemento visual (la presentación
embebida, las tarjetas de estudios y la lista de bibliografía). Si consigues más imágenes,
agrégalas ahí y aparecerán solas.

### e) Cambiando los contenidos embebidos

Hay dos marcos externos, los dos definidos en `src/content/site.js`:

| Sección | Clave | Qué es |
| --- | --- | --- |
| Después de la Sesión 1 | `game.embedUrl` | Juego de Educaplay «Visiting the doctor» |
| Después de la Sesión 2 | `presentation.embedUrl` | Presentación de Genially |

Cambia esas direcciones por cualquier otro embed (Educaplay, Wordwall, Genially, Canva,
Google Slides, YouTube) y el marco se adapta solo. La proporción de cada marco se controla
en `global.css` con `--embed-ratio` (16:9 por defecto; el juego usa 795/690).

---

## 3. Estructura del proyecto

```
src/
  content/site.js        ← TODO el texto del sitio
  images/                ← las fotos + index.js (qué foto va en qué sección)
  styles/theme.css       ← colores, tipografías, formas (el "diseño editable")
  styles/global.css      ← estilos de los componentes
  lib/content.jsx        ← motor de edición en vivo (<Editable>)
  lib/hooks.js           ← animaciones al hacer scroll, tema, estado guardado
  components/            ← una sección por archivo
  App.jsx                ← orden de las secciones
```

Para cambiar el **orden** de las secciones, reordena los componentes en `src/App.jsx` y los
ítems del menú en `nav` dentro de `src/content/site.js`.

---

## 4. Publicar en Vercel

### Opción A — desde la interfaz web (recomendada)

1. Sube esta carpeta a un repositorio de GitHub.
2. Entra a [vercel.com/new](https://vercel.com/new) e importa el repositorio.
3. Vercel detecta Vite automáticamente. Si lo pide:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy**. Cada vez que hagas push, Vercel vuelve a publicar.

### Opción B — desde la terminal

```bash
npm i -g vercel
```

```bash
vercel
```

Sigue las preguntas y, cuando esté listo:

```bash
vercel --prod
```

El archivo `vercel.json` ya trae la configuración correcta.

---

## 5. Notas

- La autoevaluación de la Sesión 2 (emociones, aspectos a mejorar y reflexión final) se
  guarda únicamente en el navegador del estudiante. No se envía nada a ningún servidor y no
  hay base de datos.
- El sitio no usa cookies ni analítica.
- El diseño es responsive (celular, tablet y computador) e incluye estilos de impresión:
  `Ctrl + P` genera un PDF limpio del documento completo.
