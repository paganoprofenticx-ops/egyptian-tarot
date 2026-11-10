import type { TarotDeck } from "@/types/tarot";
import { egyptianDeck } from "./egyptian";
import { marseilleDeck } from "./marseille";

/**
 * Catálogo de mazos de la biblioteca.
 *
 * Los mazos marcados como no disponibles sirven para mostrar la arquitectura
 * multibarraja. Cuando se incorpore su contenido, basta con añadir sus cartas
 * al repositorio sin tocar la interfaz.
 */
export const decks: TarotDeck[] = [
  egyptianDeck,
  marseilleDeck,
  {
    id: "rider-waite",
    name: "Rider-Waite-Smith",
    subtitle: "El clásico ilustrado",
    description:
      "El mazo que popularizó las imágenes narrativas del tarot en 1909. Su estructura de 78 cartas y sus escenas llenas de símbolos lo convierte en una excelente escuela de lectura.",
    origin:
      "Diseñado por Pamela Colman Smith bajo la dirección de Arthur Edward Waite. Esta biblioteca prepara una guía de estudio independiente, sin reproducir las ilustraciones originales.",
    totalCards: 78,
    availableCards: 0,
    coverImage: "/images/decks/rider-waite.svg",
    theme: "rider-waite",
    isAvailable: false,
    features: [
      "Próximamente",
      "78 cartas",
      "Lectura narrativa",
      "Correspondencias de estudio",
    ],
    accentLabel: "En preparación",
  },
];

export const availableDecks = decks.filter((deck) => deck.isAvailable);

export const getDeckById = (deckId: string): TarotDeck | undefined =>
  decks.find((deck) => deck.id === deckId);
