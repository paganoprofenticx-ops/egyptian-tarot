import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page py-20 sm:py-28">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/25 text-gold">
          <Compass size={26} aria-hidden="true" />
        </span>
        <p className="eyebrow mt-6">404 · Camino equivocado</p>
        <h1 className="mt-4 font-display text-4xl text-papyrus sm:text-5xl">
          Esta carta no está en la mesa
        </h1>
        <p className="prose-mystic mt-4">
          La página que buscas no existe o ha cambiado de lugar. Vuelve al índice y elige una
          lámina: hay 78 esperando.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/decks/tarot-egipcio" className="btn-primary text-xs">
            Explorar el mazo
          </Link>
          <Link href="/" className="btn-ghost text-xs">
            <ArrowLeft size={14} aria-hidden="true" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
