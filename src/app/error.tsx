"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // En producción, aquí se conectaría un servicio de observabilidad.
    console.error(error);
  }, [error]);

  return (
    <div className="container-page py-20 sm:py-28">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Algo no salió como esperábamos</p>
        <h1 className="mt-4 font-display text-4xl text-papyrus">La lectura se interrumpió</h1>
        <p className="prose-mystic mt-4">
          Ha ocurrido un error al cargar esta página. Puedes intentarlo de nuevo; tus favoritos y
          tu historial permanecen en este dispositivo.
        </p>
        <button type="button" onClick={reset} className="btn-primary mt-8 text-xs">
          <RotateCcw size={14} aria-hidden="true" />
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
