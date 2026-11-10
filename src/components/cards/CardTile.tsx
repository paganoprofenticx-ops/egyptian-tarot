"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { CardSummary } from "@/types/tarot";
import { useTarotStore } from "@/lib/storage/tarot-store";
import { CardImage } from "@/components/ui/CardImage";
import { cn } from "@/lib/utils";

interface CardTileProps {
  card: CardSummary;
  deckName: string;
  priority?: boolean;
  className?: string;
}

export function CardTile({ card, deckName, priority = false, className }: CardTileProps) {
  const { isFavorite, isViewed, hydrated } = useTarotStore();
  const favorite = hydrated && isFavorite(card.deckId, card.id);
  const viewed = hydrated && isViewed(card.deckId, card.id);
  const isMarseille = card.deckId === "marseille";

  return (
    <Link
      href={`/decks/${card.deckId}/cards/${card.id}`}
      className={cn("group block focus-visible:outline-none", className)}
      aria-label={`${card.name}, carta ${card.number} de ${deckName}`}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-card transition duration-500 group-hover:-translate-y-1 group-hover:border-gold/50 group-hover:shadow-gold sm:rounded-2xl">
        <CardImage
          src={card.image}
          alt={`${card.name}${card.alternateName ? `, también llamada ${card.alternateName}` : ""}`}
          priority={priority}
          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 24vw, 220px"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-70" />

        <span className="absolute left-2 top-2 inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-gold/30 bg-ink-950/75 px-2 font-display text-[0.66rem] tracking-wider text-gold-soft backdrop-blur-sm sm:left-3 sm:top-3">
          {String(card.number).padStart(2, "0")}
        </span>

        {favorite ? (
          <span
            className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full border border-gold/40 bg-ink-950/80 text-gold backdrop-blur-sm sm:right-3 sm:top-3"
            aria-label="En favoritos"
          >
            <Heart size={13} fill="currentColor" aria-hidden="true" />
          </span>
        ) : null}

        {viewed ? (
          <span className="absolute bottom-2 left-2 rounded-full border border-white/15 bg-ink-950/80 px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.14em] text-papyrus-muted backdrop-blur-sm sm:bottom-3 sm:left-3">
            Vista
          </span>
        ) : null}

        <span className="absolute inset-x-2 bottom-2 hidden translate-y-1.5 items-center justify-center rounded-full border border-gold/40 bg-ink-950/85 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-gold-soft opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
          Abrir ficha
        </span>
      </div>

      <div className="mt-2.5 px-0.5 sm:mt-3">
        <h3 className="font-display text-[0.83rem] leading-snug tracking-wide text-papyrus transition group-hover:text-gold-soft sm:text-sm">
          {card.name}
        </h3>
        {card.alternateName ? (
          <p className="mt-0.5 truncate font-serif text-[0.72rem] italic text-papyrus-dim sm:text-xs">
            {card.alternateName}
          </p>
        ) : (
          <p className="mt-0.5 text-[0.68rem] uppercase tracking-[0.14em] text-papyrus-dim">
            {card.category === "major" ? "Arcano mayor" : isMarseille ? "Arcano menor" : "Escena"}
          </p>
        )}
      </div>
    </Link>
  );
}
