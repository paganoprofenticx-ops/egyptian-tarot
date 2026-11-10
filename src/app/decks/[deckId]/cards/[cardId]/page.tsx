import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { egyptianCards } from "@/data/egyptian";
import { marseilleCards } from "@/data/marseille";
import { tarotRepository } from "@/lib/tarot/repository";
import { CardExperience } from "@/components/cards/CardExperience";
import { siteConfig } from "@/config/site";

interface CardPageProps {
  params: Promise<{ deckId: string; cardId: string }>;
}

export function generateStaticParams() {
  return [...egyptianCards, ...marseilleCards].map((card) => ({
    deckId: card.deckId,
    cardId: card.id,
  }));
}

export async function generateMetadata({ params }: CardPageProps): Promise<Metadata> {
  const { deckId, cardId } = await params;
  const data = await tarotRepository.getCardWithNeighbours(deckId, cardId);
  if (!data) return { title: "Carta no encontrada" };

  const { card, deck } = data;
  const title = `${card.name} (${card.number})`;
  const description = `${card.centralConcept}. ${card.generalMeaning.slice(0, 150)}…`;

  return {
    title,
    description,
    alternates: { canonical: `/decks/${deck.id}/cards/${card.id}` },
    openGraph: {
      type: "article",
      title: `${title} · ${deck.name}`,
      description: card.centralConcept,
      images: [{ url: card.image, width: 640, height: 1000, alt: card.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${deck.name}`,
      description: card.centralConcept,
      images: [card.image],
    },
    other: {
      "article:section": deck.name,
      "article:tag": card.keywords.join(", "),
    },
    authors: [{ name: siteConfig.author }],
  };
}

export default async function CardPage({ params }: CardPageProps) {
  const { deckId, cardId } = await params;
  const data = await tarotRepository.getCardWithNeighbours(deckId, cardId);
  if (!data) notFound();

  return (
    <CardExperience
      card={data.card}
      deck={data.deck}
      previous={data.previous}
      next={data.next}
      position={data.position}
      total={data.total}
    />
  );
}
