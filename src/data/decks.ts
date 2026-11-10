import type { TarotDeck } from "@/types/tarot";
import { egyptianDeck } from "./egyptian";
import { marseilleDeck } from "./marseille";
import { riderWaiteDeck } from "./rider-waite";

/**
 * Catálogo de mazos de la biblioteca.
 *
 * Los mazos marcados como no disponibles sirven para mostrar la arquitectura
 * multibarraja. Cuando se incorpore su contenido, basta con añadir sus cartas
 * al repositorio sin tocar la interfaz.
 */
export const decks: TarotDeck[] = [egyptianDeck, marseilleDeck, riderWaiteDeck];

export const availableDecks = decks.filter((deck) => deck.isAvailable);

export const getDeckById = (deckId: string): TarotDeck | undefined =>
  decks.find((deck) => deck.id === deckId);
