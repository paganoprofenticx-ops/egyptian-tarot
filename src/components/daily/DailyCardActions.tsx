"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Heart, Share2 } from "lucide-react";
import { shareOrCopy } from "@/lib/share";
import { useTarotStore, type StoredCard } from "@/lib/storage/tarot-store";
import { cn } from "@/lib/utils";

interface DailyCardActionsProps {
  card: Omit<StoredCard, "timestamp">;
  shareText: string;
}

export function DailyCardActions({ card, shareText }: DailyCardActionsProps) {
  const { hydrated, isFavorite, toggleFavorite } = useTarotStore();
  const favorite = hydrated && isFavorite(card.deckId, card.cardId);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "failed">("idle");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const share = async () => {
    const url = window.location.href;
    const outcome = await shareOrCopy({
      title: `La carta del día: ${card.name}`,
      text: shareText,
      url,
    });

    if (outcome === "shared" || outcome === "cancelled") return;

    setShareStatus(outcome);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setShareStatus("idle"), 2600);
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

      <button
        type="button"
        onClick={share}
        className="btn-quiet"
        aria-label={
          shareStatus === "failed"
            ? "No se pudo compartir la carta; intentar de nuevo"
            : "Compartir la carta del día"
        }
      >
        {shareStatus === "copied" ? (
          <Check size={14} aria-hidden="true" />
        ) : (
          <Share2 size={14} aria-hidden="true" />
        )}
        {shareStatus === "copied"
          ? "Enlace copiado"
          : shareStatus === "failed"
            ? "No se pudo compartir"
            : "Compartir"}
        <span className="sr-only" role="status" aria-live="polite">
          {shareStatus === "copied"
            ? "Enlace copiado al portapapeles"
            : shareStatus === "failed"
              ? "No se pudo compartir el enlace"
              : ""}
        </span>
      </button>
    </div>
  );
}
