import type { TarotCard, TarotDeck } from "@/types/tarot";
import { tarotRepository } from "@/lib/tarot/repository";

/**
 * La carta del día se elige de forma determinista a partir de la fecha: todas
 * las personas ven el mismo arcano durante la jornada y la carta cambia al día
 * siguiente. La zona horaria fija el momento del cambio para la audiencia de la
 * biblioteca.
 */
export const DAILY_CARD_TIME_ZONE = "Europe/Madrid";

const SELECTION_SALT = "arcana:carta-del-dia:v1";

export interface DailyCardCandidate {
  card: TarotCard;
  deck: TarotDeck;
}

export interface DailyCardSelection extends DailyCardCandidate {
  dateKey: string;
  total: number;
}

export interface DailyCardSummary {
  energy: string;
  advice: string;
  love: string;
  work: string;
  wellbeing: string;
  reflection: string;
}

/** Devuelve la fecha local de la biblioteca en formato ISO corto (YYYY-MM-DD). */
export function getDailyCardDateKey(
  date = new Date(),
  timeZone = DAILY_CARD_TIME_ZONE,
): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const value = (type: "year" | "month" | "day") =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${value("year")}-${value("month")}-${value("day")}`;
}

/** Formatea la clave de fecha como "Martes, 10 de noviembre de 2026". */
export function formatDailyCardDate(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  if (!year || !month || !day) return dateKey;

  const date = new Date(Date.UTC(year, month - 1, day, 12));
  const label = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);

  return label.charAt(0).toUpperCase() + label.slice(1);
}

function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function shiftDateKey(dateKey: string, days: number): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days, 12));
  const nextYear = shifted.getUTCFullYear();
  const nextMonth = String(shifted.getUTCMonth() + 1).padStart(2, "0");
  const nextDay = String(shifted.getUTCDate()).padStart(2, "0");
  return `${nextYear}-${nextMonth}-${nextDay}`;
}

/**
 * Índice diario estable. Si el azar coincide con la carta del día anterior, se
 * desplaza una posición para evitar repeticiones consecutivas.
 */
export function getDailyCardIndex(dateKey: string, total: number): number {
  if (total <= 0) return -1;
  if (total === 1) return 0;

  const indexFor = (key: string) =>
    hashString(`${SELECTION_SALT}:${key}`) % total;

  const today = indexFor(dateKey);
  const yesterday = indexFor(shiftDateKey(dateKey, -1));

  return today === yesterday ? (today + 1) % total : today;
}

export function selectDailyCard(
  candidates: DailyCardCandidate[],
  dateKey: string,
): DailyCardSelection | null {
  if (candidates.length === 0) return null;

  const ordered = [...candidates].sort((a, b) => {
    if (a.deck.id !== b.deck.id) return a.deck.id < b.deck.id ? -1 : 1;
    if (a.card.number !== b.card.number) return a.card.number - b.card.number;
    return a.card.id < b.card.id ? -1 : a.card.id > b.card.id ? 1 : 0;
  });

  const position = getDailyCardIndex(dateKey, ordered.length);
  const selected = ordered[position];
  if (!selected) return null;

  return { ...selected, dateKey, total: ordered.length };
}

export async function getDailyCard(date = new Date()): Promise<DailyCardSelection | null> {
  const candidates = await tarotRepository.getMajorArcana();
  return selectDailyCard(candidates, getDailyCardDateKey(date));
}

/** Reúne los campos de la ficha que funcionan como resumen cotidiano. */
export function buildDailyCardSummary(card: TarotCard): DailyCardSummary {
  return {
    energy: card.uprightMeaning,
    advice: card.advice,
    love: card.loveMeaning,
    work: card.workMeaning,
    wellbeing: card.healthMeaning,
    reflection: `¿Dónde notas hoy «${card.centralConcept}» en tu día?`,
  };
}
