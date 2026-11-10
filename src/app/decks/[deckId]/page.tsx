import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Layers, LockKeyhole } from "lucide-react";
import { getDeckById } from "@/data/decks";
import { tarotRepository } from "@/lib/tarot/repository";
import { DeckExplorer } from "@/components/decks/DeckExplorer";
import { CardImage } from "@/components/ui/CardImage";
import { siteConfig } from "@/config/site";

interface DeckPageProps {
  params: { deckId: string };
  searchParams?: { categoria?: string | string[] };
}

export function generateStaticParams() {
  return [{ deckId: "tarot-egipcio" }, { deckId: "marseille" }];
}

export async function generateMetadata({ params }: DeckPageProps): Promise<Metadata> {
  const deck = getDeckById(params.deckId);
  if (!deck) return { title: "Mazo no encontrado" };

  return {
    title: deck.name,
    description: deck.description,
    alternates: { canonical: `/decks/${deck.id}` },
    openGraph: {
      title: `${deck.name} · ${siteConfig.name}`,
      description: deck.description,
      images: [{ url: deck.coverImage, width: 800, height: 1100, alt: deck.name }],
    },
  };
}

export default async function DeckPage({ params, searchParams }: DeckPageProps) {
  const deck = await tarotRepository.getDeck(params.deckId);
  if (!deck) notFound();

  if (!deck.isAvailable) {
    return (
      <div className="container-page py-12 sm:py-20">
        <Link href="/decks" className="btn-quiet">
          <ArrowLeft size={14} aria-hidden="true" />
          Todos los mazos
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr] lg:items-start">
          <div className="mx-auto w-48 overflow-hidden rounded-2xl border border-white/10 shadow-card sm:w-60">
            <CardImage src={deck.coverImage} alt={`Portada de ${deck.name}`} sizes="240px" priority />
          </div>
          <div>
            <p className="eyebrow flex items-center gap-2">
              <LockKeyhole size={13} aria-hidden="true" />
              En preparación
            </p>
            <h1 className="mt-4 font-display text-4xl text-papyrus sm:text-5xl">{deck.name}</h1>
            {deck.subtitle ? (
              <p className="mt-2 font-serif text-xl italic text-gold-soft">{deck.subtitle}</p>
            ) : null}
            <p className="prose-mystic mt-5 max-w-2xl text-base">{deck.description}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-papyrus-dim">{deck.origin}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {deck.features.map((feature) => (
                <span key={feature} className="tag">{feature}</span>
              ))}
            </div>
            <Link href="/decks/tarot-egipcio" className="btn-primary mt-8 text-xs">
              Mientras tanto, explora el Tarot Egipcio
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cards = await tarotRepository.getCards(deck.id);
  const rawCategory = Array.isArray(searchParams?.categoria)
    ? searchParams?.categoria[0]
    : searchParams?.categoria;
  const initialCategory = rawCategory === "major" || rawCategory === "minor" ? rawCategory : "all";

  return (
    <div>
      <header className="border-b border-white/[0.07]">
        <div className="container-page py-5">
          <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.68rem] text-papyrus-dim">
            <Link href="/" className="transition hover:text-gold-soft">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/decks" className="transition hover:text-gold-soft">Mazos</Link>
            <span aria-hidden="true">/</span>
            <span className="text-papyrus-muted" aria-current="page">{deck.name}</span>
          </nav>
        </div>

        <div className="container-page pb-10 sm:pb-14">
          <div className="grid gap-8 lg:grid-cols-[210px_minmax(0,1fr)] lg:items-center">
            <div className="mx-auto w-40 overflow-hidden rounded-xl border border-gold/25 shadow-card sm:w-48 lg:mx-0 lg:w-full">
              <CardImage src={deck.coverImage} alt={`Portada de ${deck.name}`} sizes="210px" priority />
            </div>

            <div className="max-w-3xl">
              <p className="eyebrow flex items-center gap-2">
                <Layers size={13} aria-hidden="true" />
                {deck.accentLabel} · {deck.availableCards} cartas
              </p>
              <h1 className="mt-4 font-display text-4xl leading-tight text-papyrus text-shadow-deep sm:text-5xl">
                {deck.name}
              </h1>
              {deck.subtitle ? (
                <p className="mt-2 font-serif text-xl italic text-gold-soft">{deck.subtitle}</p>
              ) : null}
              <p className="prose-mystic mt-5 max-w-2xl text-base">{deck.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {deck.features.map((feature) => (
                  <span key={feature} className="tag border-gold/20 text-gold-soft/85">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="container-page py-8 sm:py-12">
        <DeckExplorer deck={deck} cards={cards} initialCategory={initialCategory} />
      </section>

      <section className="container-page pb-12">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <BookOpen size={17} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <h2 className="font-display text-sm tracking-wide text-papyrus">Cómo leer estas fichas</h2>
              <p className="mt-2 max-w-3xl text-xs leading-6 text-papyrus-dim">
                {deck.origin} {siteConfig.contentNotice}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
