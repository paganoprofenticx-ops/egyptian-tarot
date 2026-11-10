import type { TarotCard, TarotDeck } from "@/types/tarot";
import { marseilleBackImage, marseilleCoverImage } from "./shared";
import { marseilleMajors } from "./majors";
import { marseilleMinors } from "./minors";

export const marseilleDeck: TarotDeck = {
  id: "marseille",
  name: "Tarot de Marsella",
  subtitle: "La tradición grabada",
  description:
    "Una de las familias más reconocibles del tarot europeo: arcanos mayores de trazo grabado, colores intensos y una iconografía que ha alimentado siglos de lectura.",
  origin:
    "Tradición del tarot europeo de los siglos XVII y XVIII, con múltiples variantes regionales. Esta biblioteca prepara una guía de estudio con imágenes propias.",
  totalCards: 78,
  availableCards: 78,
  coverImage: marseilleCoverImage,
  backImage: marseilleBackImage,
  theme: "marseille",
  isAvailable: true,
  isFeatured: false,
  features: [
    "78 cartas comentadas",
    "22 arcanos mayores",
    "56 arcanos menores (4 palos)",
    "Iconografía clásica grabada",
    "Lectura tradicional",
  ],
  accentLabel: "Baraja completa",
};

export const marseilleCards: TarotCard[] = [...marseilleMajors, ...marseilleMinors].sort(
  (a, b) => a.number - b.number,
);

export const marseilleFeaturedIds = [
  "major-00",
  "major-01",
  "major-07",
  "major-13",
  "major-17",
  "major-19",
  "major-21",
];

export const getMarseilleCard = (cardId: string): TarotCard | undefined =>
  marseilleCards.find((card) => card.id === cardId);

export { marseilleMajors, marseilleMinors };