"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock3, Heart, Home, Layers, Sparkles } from "lucide-react";
import { useTarotStore } from "@/lib/storage/tarot-store";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/decks", label: "Mazos", icon: Layers },
  { href: "/carta-del-dia", label: "Hoy", icon: Sparkles },
  { href: "/favoritos", label: "Favoritos", icon: Heart },
  { href: "/historial", label: "Historial", icon: Clock3 },
];

export function BottomNav() {
  const pathname = usePathname();
  const { favorites, hydrated } = useTarotStore();

  const inCardDetail = /^\/decks\/[^/]+\/cards\/[^/]+/.test(pathname);
  if (inCardDetail) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/[0.92] backdrop-blur-xl md:hidden"
      aria-label="Navegación móvil"
    >
      <div className="safe-bottom mx-auto grid max-w-lg grid-cols-5 px-1 pt-1.5">
        {items.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex min-h-[3.4rem] flex-col items-center justify-center gap-1 rounded-xl text-[0.62rem] uppercase tracking-[0.13em] transition",
                active ? "text-gold-soft" : "text-papyrus-dim hover:text-papyrus",
              )}
              aria-current={active ? "page" : undefined}
            >
              <span className="relative">
                <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
                {item.href === "/favoritos" && hydrated && favorites.length > 0 ? (
                  <span className="absolute -right-2 -top-1.5 h-2 w-2 rounded-full bg-gold" />
                ) : null}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
