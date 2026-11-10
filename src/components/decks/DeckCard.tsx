import Link from "next/link";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import type { TarotDeck } from "@/types/tarot";
import { CardImage } from "@/components/ui/CardImage";
import { cn } from "@/lib/utils";

interface DeckCardProps {
  deck: TarotDeck;
  priority?: boolean;
  className?: string;
}

export function DeckCard({ deck, priority = false, className }: DeckCardProps) {
  const content = (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition duration-500",
        deck.isAvailable ? "hover:-translate-y-1 hover:border-gold/45 hover:shadow-gold" : "opacity-80",
        className,
      )}
    >
      <div className="flex gap-4 p-4 sm:gap-5 sm:p-5">
        <div className="w-24 shrink-0 sm:w-32">
          <div className="overflow-hidden rounded-lg border border-white/10 shadow-card">
            <CardImage
              src={deck.coverImage}
              alt={`Portada de ${deck.name}`}
              priority={priority}
              sizes="(max-width: 640px) 96px, 128px"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow-muted">
                {deck.isAvailable ? deck.accentLabel : "En preparación"}
              </p>
              <h3 className="mt-2 font-display text-lg leading-tight text-papyrus transition group-hover:text-gold-soft sm:text-xl">
                {deck.name}
              </h3>
              {deck.subtitle ? (
                <p className="mt-1 font-serif text-sm italic text-papyrus-dim">{deck.subtitle}</p>
              ) : null}
            </div>
            <span
              className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-full border",
                deck.isAvailable
                  ? "border-gold/30 text-gold"
                  : "border-white/10 text-papyrus-dim",
              )}
              aria-hidden="true"
            >
              {deck.isAvailable ? <ArrowUpRight size={16} /> : <LockKeyhole size={14} />}
            </span>
          </div>

          <p className="mt-3 line-clamp-3 text-xs leading-6 text-papyrus-muted sm:text-[0.82rem]">
            {deck.description}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
            <span className="tag">{deck.availableCards > 0 ? `${deck.availableCards} cartas` : "78 cartas"}</span>
            <span className="tag">{deck.isAvailable ? "Fichas de estudio" : "Próximamente"}</span>
          </div>
        </div>
      </div>
    </article>
  );

  if (!deck.isAvailable) return content;

  return (
    <Link href={`/decks/${deck.id}`} className="block h-full rounded-2xl focus-visible:outline-none">
      {content}
    </Link>
  );
}
