import Image from "next/image";
import { cn } from "@/lib/utils";

interface CardImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
}

/**
 * Imagen de carta con proporción fija. Se sirve sin optimización porque los
 * SVG están pensados para sustituirse por arte final con la misma ruta.
 */
export function CardImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px",
  className,
  imageClassName,
}: CardImageProps) {
  return (
    <div className={cn("relative aspect-[16/25] overflow-hidden bg-ink-900", className)}>
      <Image
        src={src}
        alt={alt}
        width={640}
        height={1000}
        priority={priority}
        sizes={sizes}
        unoptimized
        className={cn("h-full w-full object-cover", imageClassName)}
      />
    </div>
  );
}
