import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label="Arcana, ir a la portada"
    >
      <span className="relative grid h-10 w-10 place-items-center rounded-full border border-gold/45 bg-ink-900/70 text-gold transition group-hover:border-gold group-hover:text-gold-bright">
        <svg
          viewBox="0 0 32 32"
          className="h-5 w-5"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <path d="M16 4.5c-3.6 0-6.3 2.7-6.3 6.1 0 4.8 6.3 8.1 6.3 8.1s6.3-3.3 6.3-8.1c0-3.4-2.7-6.1-6.3-6.1Z" />
          <path d="M16 18.7V28M11 22.4h10" />
          <path d="M5.5 9.5 8 12M26.5 9.5 24 12" opacity=".45" />
        </svg>
      </span>
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-[0.22em] text-papyrus">ARCANA</span>
          <span className="mt-1 text-[0.58rem] uppercase tracking-[0.32em] text-papyrus-dim">
            Biblioteca de Tarot
          </span>
        </span>
      ) : null}
    </Link>
  );
}
