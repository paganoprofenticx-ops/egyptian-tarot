import type { CardSeries, NumerologyInfo } from "@/types/tarot";

/**
 * Utilidades compartidas por los mazos de la biblioteca.
 *
 * La numerología y las correspondencias de palo son claves de estudio: no son
 * marcas impresas en las barajas, sino herramientas para agrupar y comparar.
 */
export function reduceNumber(value: number): number {
  let current = Math.abs(value);
  while (current > 9) {
    current = String(current)
      .split("")
      .reduce((total, digit) => total + Number(digit), 0);
  }
  return current;
}

export const numberTitles: Record<number, string> = {
  1: "La unidad",
  2: "La dualidad",
  3: "La creación",
  4: "La estructura",
  5: "El movimiento",
  6: "La armonía",
  7: "La reflexión",
  8: "El equilibrio de poder",
  9: "La culminación",
};

export const numberDescriptions: Record<number, string> = {
  1: "El uno inaugura la serie: es el punto de partida, la identidad y la voluntad que se afirma.",
  2: "El dos introduce la relación, la escucha y la tensión creativa entre dos polos.",
  3: "El tres es el primer fruto: la idea y su opuesto generan una tercera posibilidad.",
  4: "El cuatro aporta límites, método y una base estable sobre la que construir.",
  5: "El cinco rompe la estabilidad y abre la puerta al cambio, la experiencia y el movimiento.",
  6: "El seis busca armonía, cuidado y reciprocidad entre las partes.",
  7: "El siete invita a mirar hacia dentro, a estudiar y a distinguir lo esencial de lo accesorio.",
  8: "El ocho pone en juego la fuerza y la responsabilidad; su equilibrio depende de la justicia.",
  9: "El nueve cierra un ciclo y prepara la entrega de lo aprendido antes de volver a empezar.",
};

export function buildNumerology(
  base: number,
  title: string,
  description: string,
): NumerologyInfo {
  return { number: base, reduced: reduceNumber(base), title, description };
}

export interface SeriesInfo {
  label: string;
  element: string;
  theme: string;
  love: string;
  work: string;
  health: string;
  growth: string;
}

export const seriesInfo: Record<CardSeries, SeriesInfo> = {
  bastos: {
    label: "Serie de Bastos",
    element: "Fuego",
    theme: "el impulso, el trabajo y la voluntad creadora",
    love: "Se expresa en el deseo de construir y de compartir el impulso cotidiano.",
    work: "Se relaciona con la iniciativa, el esfuerzo sostenido y la capacidad de emprender.",
    health: "Sugiere atención a la energía vital, al descanso y al ritmo del cuerpo.",
    growth: "Invita a convertir la energía en hábitos concretos y sostenibles.",
  },
  copas: {
    label: "Serie de Copas",
    element: "Agua",
    theme: "el vínculo, la emoción y la vida interior",
    love: "Se expresa en la intimidad, la escucha emocional y la reciprocidad.",
    work: "Se relaciona con el clima del grupo, la confianza y el sentido de pertenencia.",
    health: "Sugiere atención a la carga emocional y a los espacios de recuperación.",
    growth: "Invita a nombrar lo que sientes sin confundir emoción con verdad absoluta.",
  },
  espadas: {
    label: "Serie de Espadas",
    element: "Aire",
    theme: "el pensamiento, la palabra y la elección",
    love: "Se expresa en la comunicación, los acuerdos y la claridad de intenciones.",
    work: "Se relaciona con el análisis, la estrategia y la resolución de conflictos.",
    health: "Sugiere atención al estrés mental, al sueño y a la respiración consciente.",
    growth: "Invita a revisar las historias que cuentas antes de convertirlas en decisiones.",
  },
  oros: {
    label: "Serie de Oros",
    element: "Tierra",
    theme: "los recursos, el cuerpo y lo que se cultiva a largo plazo",
    love: "Se expresa en la seguridad, la presencia y los gestos que sostienen el vínculo.",
    work: "Se relaciona con los resultados, la administración y la construcción paciente.",
    health: "Sugiere atención al cuerpo, la alimentación y los ritmos de descanso.",
    growth: "Invita a medir el valor real de lo que tienes y de lo que estás dispuesto a cuidar.",
  },
};

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}
