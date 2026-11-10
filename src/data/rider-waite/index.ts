import type { TarotCard, TarotDeck } from "@/types/tarot";
import { riderWaiteBackImage, riderWaiteCoverImage } from "./shared";
import { riderWaiteMajors } from "./majors";
import { riderWaiteMinors } from "./minors";

export const riderWaiteDeck: TarotDeck = {
  id: "rider-waite",
  name: "Rider-Waite-Smith",
  subtitle: "El clásico ilustrado",
  description:
    "El mazo que popularizó las imágenes narrativas del tarot en 1909. Sus 78 cartas y sus escenas llenas de símbolos lo convierten en una excelente escuela de lectura: cada arcano menor cuenta una situación reconocible.",
  origin:
    "Diseñado por Pamela Colman Smith bajo la dirección de Arthur Edward Waite. Esta biblioteca ofrece una guía de estudio independiente, con fichas y símbolos propios, sin reproducir las ilustraciones originales.",
  totalCards: 78,
  availableCards: 78,
  coverImage: riderWaiteCoverImage,
  backImage: riderWaiteBackImage,
  theme: "rider-waite",
  isAvailable: true,
  isFeatured: false,
  features: [
    "78 cartas comentadas",
    "22 arcanos mayores",
    "56 arcanos menores (4 palos)",
    "Escenas ilustradas y simbología",
    "Correspondencias de estudio",
  ],
  accentLabel: "Baraja completa",
};

export const riderWaiteCards: TarotCard[] = [...riderWaiteMajors, ...riderWaiteMinors].sort(
  (a, b) => a.number - b.number,
);

export const riderWaiteFeaturedIds = [
  "major-00",
  "major-01",
  "major-06",
  "major-10",
  "major-13",
  "major-17",
  "major-21",
];

export const getRiderWaiteCard = (cardId: string): TarotCard | undefined =>
  riderWaiteCards.find((card) => card.id === cardId);

export { riderWaiteMajors, riderWaiteMinors };
