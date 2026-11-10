import type { Metadata } from "next";
import { Search } from "lucide-react";
import { tarotRepository } from "@/lib/tarot/repository";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Buscar",
  description:
    "Busca por nombre, palabra clave, número o concepto en todas las cartas de la biblioteca.",
};

interface SearchPageProps {
  searchParams?: { q?: string | string[] };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const cards = await tarotRepository.getGlobalSummaries();
  const rawQuery = Array.isArray(searchParams?.q) ? searchParams?.q[0] : searchParams?.q;

  return (
    <div>
      <PageHeader
        eyebrow="Búsqueda global"
        title="¿Qué carta tienes en mente?"
        description="Escribe un nombre, un símbolo, una emoción o el número de la lámina. La búsqueda recorre todas las cartas disponibles en la biblioteca."
        aside={
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-papyrus-muted">
            <Search size={15} className="text-gold" aria-hidden="true" />
            {cards.length} cartas indexadas
          </div>
        }
      />
      <section className="container-page py-8 sm:py-12">
        <GlobalSearch cards={cards} initialQuery={rawQuery ?? ""} />
      </section>
    </div>
  );
}
