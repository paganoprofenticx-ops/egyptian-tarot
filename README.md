# Arcana · Biblioteca de Tarot

Biblioteca interactiva para estudiar tarot carta a carta. Incluye el **Tarot Egipcio de Margarita Arnal**, con 22 arcanos mayores y 56 escenas numeradas de la tradición egipcia de Kier, y el **Tarot de Marsella**, con sus 78 cartas repartidas en 22 arcanos mayores y 56 menores.

La aplicación está pensada para el móvil, funciona sin backend y guarda favoritos, historial y progreso en el propio dispositivo. La capa de datos está separada de la interfaz y preparada para incorporar una base de datos o un panel de administración en el futuro.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS
- `lucide-react`
- Repositorio local async como fuente de datos
- `localStorage` con claves versionadas para el estado personal

## Comandos

```bash
npm install
npm run dev        # desarrollo en http://localhost:3000
npm run build      # build de producción
npm run start      # servir el build
npm run lint       # ESLint
npm run typecheck  # TypeScript sin emitir
npm run art            # regenerar las ilustraciones del Tarot Egipcio
npm run art:marseille  # regenerar las ilustraciones del Tarot de Marsella
npm run data:marseille # regenerar el manifiesto de cartas de Marsella
npm run art:import     # importar imágenes reales desde art-source/
```

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Portada, carta del día, continuación de lectura, selector de mazos y cartas destacadas |
| `/carta-del-dia` | Arcano mayor aleatorio del día y resumen para la jornada |
| `/decks` | Catálogo de mazos |
| `/decks/tarot-egipcio` | Galería de las 78 cartas con búsqueda, filtros y progreso |
| `/decks/marseille` | Galería de las 78 cartas del Tarot de Marsella |
| `/decks/[deckId]/cards/[cardId]` | Ficha completa: giro de carta, deslizamiento, secciones y navegación |
| `/buscar` | Búsqueda global por nombre, palabra clave, número o concepto |
| `/favoritos` | Cartas guardadas |
| `/historial` | Últimas cartas visitadas, agrupadas por día |

## Estructura

```text
src/
  app/                 Rutas y layouts (Server Components)
  components/          Interfaz (servidor y cliente)
  config/              Marca, navegación y temas por mazo
  data/
    decks.ts           Catálogo de mazos
    egyptian/
      cards.json       Manifiesto de las 78 cartas (número, id, nombre, slug)
      majors.ts        Contenido completo de los 22 arcanos mayores
      minors.ts        Contenido de las 56 escenas menores
      shared.ts        Numerología, paleta y metadatos de series
      index.ts         Mazo egipcio, cartas y destacadas
    marseille/
      cards.json       Manifiesto de las 78 cartas
      majors.ts        Contenido de los 22 arcanos mayores
      minors.ts        Contenido de los 56 arcanos menores
      shared.ts        Paleta, palos y rutas de imágenes
      index.ts         Mazo de Marsella, cartas y destacadas
  lib/
    tarot/             Repositorio, utilidades de búsqueda y carta del día
    storage/           Provider de favoritos, historial y progreso
  types/tarot.ts       Modelo de datos canónico
scripts/
  generate-card-art.mjs          Genera los SVG del Tarot Egipcio
  generate-marseille-art.mjs     Genera los SVG del Tarot de Marsella
  generate-marseille-manifest.mjs Actualiza el manifiesto de Marsella
  import-card-art.mjs            Importa las imágenes reales
art-source/
  tarot-egipcio/          Carpeta donde dejar las imágenes (ver README interno)
public/images/
  cards/egyptian/         78 SVG provisionales (una por carta)
  cards/marseille/        78 SVG originales + dorso.svg
  cards/back.svg          Dorso provisional egipcio
  decks/                  Portadas de los mazos
```

## Modelo de datos

`src/types/tarot.ts` define `TarotCard`, `TarotDeck` y `CardSummary`. La ficha completa incluye:

- identidad: `id`, `deckId`, `number`, `name`, `alternateName`, `image`, `category`, `series`
- lectura: `centralConcept`, `generalMeaning`, `message`, `keywords`, `symbolism`
- correspondencias: `numerology`, `astrology`, `esoteric`, `colors`
- planos: `spiritualPlane`, `mentalPlane`, `materialPlane`
- interpretaciones: `uprightMeaning`, `reversedMeaning`, `loveMeaning`, `workMeaning`, `healthMeaning`, `personalDevelopment`, `advice`
- estado editorial: `contentStatus` (`complete` para mayores, `didactic` para menores)

Los campos opcionales permiten incorporar nuevas barajas sin rellenar toda la ficha de golpe.

### Repositorio

`src/lib/tarot/repository.ts` expone una interfaz asíncrona (`getDecks`, `getDeck`, `getCards`, `getCard`, `getCardWithNeighbours`, `getFeatured`, `getGlobalSummaries`, `getMajorArcana`, `search`). La implementación actual es local y estática.

`src/lib/tarot/daily.ts` elige la carta del día entre los arcanos mayores de los mazos disponibles. La selección es determinista a partir de la fecha (misma carta para todo el día) y el resumen se construye con los campos de interpretación de la ficha (`uprightMeaning`, `advice`, `loveMeaning`, `workMeaning`, `healthMeaning`).

Para conectar Supabase, Prisma u otra fuente, se crea otra clase que implemente `TarotRepository` y se cambia la exportación `tarotRepository`. Las páginas y componentes no necesitan cambios.

## Añadir un mazo

1. Añadir su entrada en `src/data/decks.ts`.
2. Crear `src/data/<mazo>/` con sus cartas y exportarlas.
3. Registrar las cartas en `cardsByDeck` y las destacadas en `featuredByDeck` dentro de `repository.ts`.
4. Añadir las imágenes en `public/images/cards/<mazo>/` y la portada en `public/images/decks/`.
5. Ajustar los tokens visuales del tema en `src/app/globals.css` y `src/config/themes.ts`.

Las rutas, favoritos, historial, búsqueda y diseño responsive ya funcionan con cualquier mazo disponible.

## Ilustraciones

Las imágenes actuales son **SVG originales generados por script**. No reproducen ilustraciones protegidas por derechos de autor ni pertenecen a ninguna edición comercial.

- `scripts/generate-card-art.mjs` lee `src/data/egyptian/cards.json` y genera `public/images/cards/egyptian/NN-slug.svg`, el dorso `public/images/cards/back.svg` y las portadas `tarot-egipcio.svg` y `rider-waite.svg`.
- `scripts/generate-marseille-art.mjs` lee `src/data/marseille/cards.json` y genera las 78 cartas en `public/images/cards/marseille/`, su dorso `back.svg` y la portada `public/images/decks/marseille.svg`. El estilo evoca el grabado marsellés: papel marfil, tinta oscura, terracota, añil y oro viejo.

Ambos scripts están separados para que regenerar un mazo no sobrescriba el arte del otro.

## Añadir las imágenes reales

Cuando tengas las láminas (propias, escaneadas o con licencia), deja los archivos en `art-source/tarot-egipcio/` y ejecuta:

```bash
npm run art:import
```

- Nombres: `01.jpg` … `78.jpg` (también `01-el-mago.jpg`), o PNG/WebP.
- Dorso: `dorso.jpg` / `back.jpg`. Portada: `portada.jpg` / `cover.jpg`.
- Proporción recomendada: 16:25 (640 × 1000 px), menos de 1,5 MB por imagen.
- Las cartas sin archivo siguen usando su SVG provisional.
- `npm run art:import -- --clean` elimina lo importado y vuelve a los SVG.

El script copia las imágenes a `public/` y actualiza `src/data/egyptian/art-manifest.json`. La app resuelve cada carta con `imageFor()`: usa la imagen del manifiesto si existe y, si no, el SVG. No hay que tocar componentes ni rutas.

> Las imágenes importadas no se incluyen en el repositorio. No publiques láminas de barajas comerciales sin autorización.

## Persistencia local

Claves usadas en `localStorage` (prefijo versionado `arcana:v1`):

- `favorites`: cartas guardadas
- `history`: últimas 60 cartas visitadas
- `progress`: ids de cartas vistas por mazo
- `last-card`: última carta abierta, para retomar la lectura

La lectura y escritura están protegidas con `try/catch` para que la app siga funcionando si el almacenamiento no está disponible. El estado se sincroniza entre pestañas mediante el evento `storage`.

## Criterio de contenido

Las fichas separan la tradición de la síntesis didáctica:

- Los **arcanos mayores** tienen ficha completa con simbolismo, planos e interpretaciones.
- Las **56 escenas menores** del Tarot Egipcio usan los nombres de la tradición de Kier y una síntesis didáctica propia.
- Los **56 arcanos menores** del Tarot de Marsella se organizan en los palos de Bastos, Copas, Espadas y Oros, del As al Rey.
- Las correspondencias astrológicas, cabalísticas y numerológicas se presentan explícitamente como **claves de estudio**, no como hechos impresos en la baraja.
- En el Tarot Egipcio, las series de Bastos, Copas, Espadas y Oros son una agrupación didáctica; la baraja no lleva palos impresos ni cartas de corte.
- El contenido no sustituye asesoramiento médico, legal o psicológico.

El aviso completo vive en `src/config/site.ts` (`contentNotice`) y se reutiliza en el pie, la galería y las fichas.

## Accesibilidad y rendimiento

- Navegación con teclado, foco visible y enlace para saltar al contenido.
- Flechas del teclado para cambiar de carta; gesto de deslizamiento en móvil.
- Respeto a `prefers-reduced-motion`.
- Imágenes SVG ligeras con proporción reservada para evitar saltos de layout.
- Barra inferior móvil y barra específica de navegación en el detalle de carta.
