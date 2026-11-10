import type { TarotCard, TarotDeck } from "@/types/tarot";
import { egyptianBackImage, egyptianCoverImage } from "./shared";
import { egyptianMajors } from "./majors";
import { egyptianMinors } from "./minors";

export const egyptianDeck: TarotDeck = {
  id: "tarot-egipcio",
  name: "Tarot Egipcio",
  subtitle: "de Margarita Arnal",
  description:
    "Una baraja de 78 láminas que reúne los 22 arcanos mayores y 56 escenas numeradas de la tradición egipcia difundida por el Tarot Egipcio de Kier. Aquí encontrarás una ficha de estudio para cada carta: simbología, correspondencias, planos de lectura e interpretaciones.",
  origin:
    "Estructura de la tradición egipcia de Kier, en la edición de Margarita Arnal. Las correspondencias astrológicas y cabalísticas son claves de estudio y pueden variar según la edición.",
  totalCards: 78,
  availableCards: 78,
  coverImage: egyptianCoverImage,
  backImage: egyptianBackImage,
  theme: "egyptian",
  isAvailable: true,
  isFeatured: true,
  features: [
    "78 cartas comentadas",
    "22 arcanos mayores",
    "56 escenas numeradas",
    "Simbología y planos de lectura",
  ],
  accentLabel: "Baraja completa",
};

export const egyptianCards: TarotCard[] = [...egyptianMajors, ...egyptianMinors].sort(
  (a, b) => a.number - b.number,
);

export const egyptianFeaturedIds = [
  "major-01",
  "major-02",
  "major-03",
  "major-10",
  "major-17",
  "major-19",
  "major-21",
];

export const getEgyptianCard = (cardId: string): TarotCard | undefined =>
  egyptianCards.find((card) => card.id === cardId);

export { egyptianMajors, egyptianMinors };
