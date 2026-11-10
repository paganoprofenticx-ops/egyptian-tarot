#!/usr/bin/env node
/**
 * Genera el manifiesto de las 78 cartas del Tarot de Marsella.
 *
 * El manifiesto es la fuente de identidad de cada carta (número, id, nombre,
 * slug y palo). El rango de los menores se deriva del número en minors.ts.
 *
 * Uso: npm run data:marseille
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "src/data/marseille/cards.json");

const majors = [
  ["El Loco", "El Excéntrico", "el-loco"],
  ["El Mago", "El Juglar", "el-mago"],
  ["La Papisa", "La Suma Sacerdotisa", "la-papisa"],
  ["La Emperatriz", "La Reina", "la-emperatriz"],
  ["El Emperador", "El Rey", "el-emperador"],
  ["El Papa", "El Sumo Pontífice", "el-papa"],
  ["Los Enamorados", "El Enamorado", "los-enamorados"],
  ["El Carro", "La Victoria", "el-carro"],
  ["La Justicia", "El Equilibrio", "la-justicia"],
  ["El Ermitaño", "El Sabio", "el-ermitano"],
  ["La Rueda de la Fortuna", "El Destino", "la-rueda-de-la-fortuna"],
  ["La Fuerza", "La Fortaleza", "la-fuerza"],
  ["El Colgado", "El Sacrificado", "el-colgado"],
  ["La Muerte", "Arcano XIII", "la-muerte"],
  ["La Templanza", "La Moderación", "la-templanza"],
  ["El Diablo", "El Encadenado", "el-diablo"],
  ["La Torre", "La Casa de Dios", "la-torre"],
  ["La Estrella", "La Esperanza", "la-estrella"],
  ["La Luna", "La Ilusión", "la-luna"],
  ["El Sol", "La Claridad", "el-sol"],
  ["El Juicio", "La Resurrección", "el-juicio"],
  ["El Mundo", "La Realización", "el-mundo"],
];

const suits = [
  { series: "bastos", label: "Bastos", first: 23 },
  { series: "copas", label: "Copas", first: 37 },
  { series: "espadas", label: "Espadas", first: 51 },
  { series: "oros", label: "Oros", first: 65 },
];

const ranks = [
  [1, "As", "as"],
  [2, "Dos", "dos"],
  [3, "Tres", "tres"],
  [4, "Cuatro", "cuatro"],
  [5, "Cinco", "cinco"],
  [6, "Seis", "seis"],
  [7, "Siete", "siete"],
  [8, "Ocho", "ocho"],
  [9, "Nueve", "nueve"],
  [10, "Diez", "diez"],
  [11, "Sota", "sota"],
  [12, "Caballo", "caballo"],
  [13, "Reina", "reina"],
  [14, "Rey", "rey"],
];

const cards = [
  ...majors.map(([name, alternateName, slug], number) => ({
    number,
    id: `major-${String(number).padStart(2, "0")}`,
    name,
    alternateName,
    slug,
    category: "major",
  })),
  ...suits.flatMap((suit) =>
    ranks.map(([rank, rankLabel, rankSlug]) => {
      const number = suit.first + rank - 1;
      return {
        number,
        id: `minor-${String(number).padStart(2, "0")}`,
        name: `${rankLabel} de ${suit.label}`,
        slug: `${rankSlug}-de-${suit.series}`,
        category: "minor",
        series: suit.series,
      };
    }),
  ),
];

mkdirSync(join(root, "src/data/marseille"), { recursive: true });
writeFileSync(output, `${JSON.stringify(cards, null, 2)}\n`, "utf8");
console.log(`Generadas ${cards.length} cartas en src/data/marseille/cards.json.`);
