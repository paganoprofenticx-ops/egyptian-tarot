"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Heart, Share2 } from "lucide-react";
import { useTarotStore, type StoredCard } from "@/lib/storage/tarot-store";
import { cn } from "@/lib/utils";

interface DailyCardActionsProps {
  card: Omit<StoredCard, "timestamp">;
  shareText: string;
}

export function DailyCardActions({ card, shareText }: DailyCardActionsProps) {
  const { hydrated, isFavorite, toggleFavorite } = useTarotStore();
  const favorite = hydrated && isFavorite(card.deckId, card.cardId);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const share = async () => {
    const url = window.location.href;
    const shareData = {
      title: `La carta del día: ${card.name}`,
      text: shareText,
      url,
    };

    try {
      if (typeof navigator.share === "function") {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      // El usuario canceló el diálogo o el portapapeles no está disponible.
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => toggleFavorite(card)}
        className={cn(
          "btn-quiet",
          favorite && "border-gold/50 bg-gold/10 text-gold-soft",
        )}
        aria-pressed={favorite}
        aria-label={favorite ? "Quitar la carta del día de favoritos" : "Guardar la carta del día en favoritos"}
      >
        <Heart size={15} fill={favorite ? "currentColor" : "none"} aria-hidden="true" />
        {favorite ? "Guardada" : "Guardar"}
      </button>

      <button type="button" onClick={share} className="btn-quiet" aria-label="Compartir la carta del día">
        {copied ? <Check size={14} aria-hidden="true" /> : <Share2 size={14} aria-hidden="true" />}
        {copied ? "Enlace copiado" : "Compartir"}
      </button>
    </div>
  );
}
