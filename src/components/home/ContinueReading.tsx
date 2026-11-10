"use client";

import Link from "next/link";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import type { CardSummary } from "@/types/tarot";
import { useTarotStore } from "@/lib/storage/tarot-store";
import { CardImage } from "@/components/ui/CardImage";

interface ContinueReadingProps {
  fallbackCard: CardSummary;
  fallbackDeckName: string;
}

export function ContinueReading({ fallbackCard, fallbackDeckName }: ContinueReadingProps) {
  const { lastCard, hydrated, history } = useTarotStore();

  const active = hydrated && lastCard ? lastCard : null;
  const viewedTotal = hydrated ? history.length : 0;

  return (
    <div className="panel ornament-corner overflow-hidden p-5 sm:p-7">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="w-24 shrink-0 self-start sm:w-28">
          <div className="overflow-hidden rounded-xl border border-gold/25 shadow-card">
            <CardImage
              src={active?.image ?? fallbackCard.image}
              alt={active ? `Continuar con ${active.name}` : `${fallbackCard.name}`}
              sizes="112px"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="eyebrow flex items-center gap-2">
            <Compass size={13} aria-hidden="true" />
            {active ? "Continúa donde lo dejaste" : "Empieza tu recorrido"}
          </p>
          <h2 className="mt-2 font-display text-xl text-papyrus sm:text-2xl">
            {active ? active.name : fallbackCard.name}
          </h2>
          <p className="mt-2 text-sm leading-6 text-papyrus-muted">
            {active
              ? `Última carta abierta en ${active.deckName}. Retoma la lectura y sigue con la siguiente cuando quieras.`
              : `Todavía no has abierto ninguna carta. Una buena puerta de entrada es ${fallbackCard.name}: ${fallbackCard.centralConcept.toLowerCase()}.`}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href={
                active
                  ? `/decks/${active.deckId}/cards/${active.cardId}`
                  : `/decks/${fallbackCard.deckId}/cards/${fallbackCard.id}`
              }
              className="btn-primary text-xs"
            >
              {active ? "Retomar lectura" : "Abrir primera carta"}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <span className="inline-flex items-center gap-1.5 text-xs text-papyrus-dim">
              <Sparkles size={13} aria-hidden="true" />
              {viewedTotal > 0
                ? `${viewedTotal} ${viewedTotal === 1 ? "carta en tu historial" : "cartas en tu historial"}`
                : fallbackDeckName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
