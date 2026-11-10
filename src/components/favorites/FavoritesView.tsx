"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Trash2 } from "lucide-react";
import { useTarotStore } from "@/lib/storage/tarot-store";
import { CardImage } from "@/components/ui/CardImage";

export function FavoritesView() {
  const { favorites, hydrated, removeFavorite, clearFavorites } = useTarotStore();
  const [confirming, setConfirming] = useState(false);

  if (!hydrated) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[16/25] rounded-xl border border-white/5 bg-white/[0.03]" />
            <div className="mt-3 h-3 w-2/3 rounded bg-white/[0.05]" />
          </div>
        ))}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/25 text-gold">
          <Heart size={22} aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-xl text-papyrus">Tu colección está vacía</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-papyrus-muted">
          Abre una carta y pulsa el corazón para guardarla aquí. Tus favoritos quedan en este
          dispositivo y puedes volver a ellos cuando quieras.
        </p>
        <Link href="/decks/tarot-egipcio" className="btn-primary mt-6 text-xs">
          Explorar el Tarot Egipcio
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-papyrus-muted">
          <span className="text-papyrus">{favorites.length}</span>{" "}
          {favorites.length === 1 ? "carta guardada" : "cartas guardadas"}
        </p>
        {confirming ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-papyrus-dim">¿Vaciar la colección?</span>
            <button
              type="button"
              onClick={() => {
                clearFavorites();
                setConfirming(false);
              }}
              className="rounded-full border border-carnelian/40 bg-carnelian/10 px-3 py-1.5 text-xs text-[#E7A28F]"
            >
              Sí, vaciar
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-papyrus-muted"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirming(true)} className="btn-quiet">
            <Trash2 size={13} aria-hidden="true" />
            Vaciar colección
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
        {favorites.map((item) => (
          <article key={`${item.deckId}-${item.cardId}`} className="group">
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-card transition group-hover:border-gold/40">
              <Link href={`/decks/${item.deckId}/cards/${item.cardId}`} aria-label={`Abrir ${item.name}`}>
                <CardImage
                  src={item.image}
                  alt={item.name}
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 24vw, 220px"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent opacity-0 transition group-hover:opacity-100" />
              </Link>
              <button
                type="button"
                onClick={() => removeFavorite(item.deckId, item.cardId)}
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full border border-gold/40 bg-ink-950/85 text-gold backdrop-blur transition hover:border-carnelian/60 hover:text-[#E7A28F]"
                aria-label={`Quitar ${item.name} de favoritos`}
              >
                <Heart size={14} fill="currentColor" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-2.5">
              <Link
                href={`/decks/${item.deckId}/cards/${item.cardId}`}
                className="font-display text-sm tracking-wide text-papyrus transition hover:text-gold-soft"
              >
                {item.name}
              </Link>
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.12em] text-papyrus-dim">
                {item.deckName} · Nº {String(item.number).padStart(2, "0")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
