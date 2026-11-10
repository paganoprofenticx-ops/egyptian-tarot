export const siteConfig = {
  name: "Arcana",
  tagline: "Biblioteca de Tarot",
  description:
    "Aprende, explora y consulta el tarot a tu ritmo. Fichas de estudio, simbología, correspondencias e interpretaciones en una experiencia pensada para el móvil.",
  shortDescription:
    "Una biblioteca interactiva para aprender tarot, carta a carta.",
  locale: "es_ES",
  url: "https://arcana.example.com",
  author: "Arcana",
  contentNotice:
    "Las fichas combinan la tradición de cada baraja con una síntesis didáctica propia. Las correspondencias astrológicas, cabalísticas y numerológicas son claves de estudio y pueden variar según la edición. Este contenido no sustituye asesoramiento médico, legal o psicológico.",
  nav: [
    { href: "/", label: "Inicio" },
    { href: "/decks", label: "Mazos" },
    { href: "/carta-del-dia", label: "Carta del día" },
    { href: "/favoritos", label: "Favoritos" },
    { href: "/historial", label: "Historial" },
  ],
} as const;
