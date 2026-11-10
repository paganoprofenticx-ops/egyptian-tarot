import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Layers, Sparkles } from "lucide-react";
import { tarotRepository } from "@/lib/tarot/repository";
import { DeckCard } from "@/components/decks/DeckCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Mazos",
  description:
    "Explora los mazos de la biblioteca. El Tarot Egipcio de Margarita Arnal y el Tarot de Marsella están disponibles con sus 78 cartas comentadas.",
};

export default async function DecksPage() {
  const decks = await tarotRepository.getDecks();
  const available = decks.filter((deck) => deck.isAvailable).length;

  return (
    <div>
      <PageHeader
        eyebrow="La biblioteca"
        title="Elige un mazo, elige una voz"
        description="Cada baraja tiene una estructura, una historia y una manera de mirar. Aquí encontrarás las fichas de estudio disponibles y las que están en preparación."
        aside={
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-papyrus-muted">
            <Layers size={15} className="text-gold" aria-hidden="true" />
            {decks.length} mazos en el catálogo · {available} disponibles
          </div>
        }
      />

      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-4 lg:grid-cols-2">
          {decks.map((deck, index) => (
            <DeckCard key={deck.id} deck={deck} priority={index < 2} />
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-gold/20 bg-gold/[0.04] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/30 text-gold">
              <Sparkles size={17} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-lg text-papyrus">Una arquitectura preparada para crecer</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-papyrus-muted">
                Los datos de cada mazo viven separados de la interfaz. Incorporar una nueva baraja
                consiste en añadir su contenido al repositorio y su tema visual; las rutas, la
                búsqueda, los favoritos y el historial funcionan sin cambios.
              </p>
              <p className="mt-3 max-w-2xl text-xs leading-6 text-papyrus-dim">
                {siteConfig.contentNotice}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/" className="btn-quiet">
            <ArrowLeft size={14} aria-hidden="true" />
            Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}
