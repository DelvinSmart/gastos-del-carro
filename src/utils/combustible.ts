// Cuánto combustible queda en el tanque y cuántos km más se pueden rodar.
// Lo estudias en el Tema 01 (leer código) y sus pruebas en el Tema 02.

export interface Carga {
  id: string;
  fecha: string;          // AAAA-MM-DD
  litros: number;
  odometroKm: number;     // el km que marcaba el carro al cargar
  tanqueLleno: boolean;   // ¿se llenó el tanque?
}

/** El resultado: o falta algún dato (y se dice cuál), o la estimación. */
export type NivelCombustible =
  | { estado: 'falta_capacidad' }      // todavía no se sabe cuántos litros entran en el tanque
  | { estado: 'sin_carga' }            // no hay ninguna carga de dónde partir
  | { estado: 'sin_consumo' }          // hay cargas, pero ningún tanque cerrado: no se sabe el km/L
  | { estado: 'ok'; fraccion: number; litrosQuedan: number; autonomiaKm: number; kmPorLitro: number };

export const CAPACIDAD_MIN = 1;
export const CAPACIDAD_MAX = 200;

/** "45", "45,5" o "45.5" → número; vacío, inválido o fuera de 1–200 → null. */
export function leerCapacidad(texto: string): number | null {
  const normal = texto.trim().replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(normal)) return null;
  const valor = Number(normal);
  if (valor < CAPACIDAD_MIN || valor > CAPACIDAD_MAX) return null;
  return Math.round(valor * 10) / 10;
}

const porFecha = (cargas: readonly Carga[]): Carga[] =>
  cargas.toSorted((a, b) => a.fecha.localeCompare(b.fecha) || a.odometroKm - b.odometroKm);

/**
 * El consumo (km/L) del último tanque cerrado: entre dos cargas de tanque lleno,
 * los km rodados divididos por los litros que se cargaron al final.
 */
export function kmPorLitroDelUltimoTanque(cargas: readonly Carga[]): number | null {
  const llenas = porFecha(cargas).filter((c) => c.tanqueLleno);
  for (let i = llenas.length - 1; i >= 1; i -= 1) {
    const antes = llenas[i - 1];
    const despues = llenas[i];
    if (!antes || !despues) continue;
    const km = despues.odometroKm - antes.odometroKm;
    if (km > 0 && despues.litros > 0) return km / despues.litros;
  }
  return null;
}

/**
 * Estima el combustible que queda ahora.
 * - La última carga con tanque lleno deja el tanque al 100 %.
 * - Cada km rodado desde entonces gasta 1 / kmPorLitro litros.
 */
export function estimarNivel(entrada: {
  capacidadLitros: number | null;
  cargas: readonly Carga[];
  odometroActualKm: number;
}): NivelCombustible {
  const capacidad = entrada.capacidadLitros ?? 0;
  if (!(capacidad > 0)) return { estado: 'falta_capacidad' };

  const ultimaLlena = porFecha(entrada.cargas).filter((c) => c.tanqueLleno).at(-1);
  if (!ultimaLlena) return { estado: 'sin_carga' };

  const kmPorLitro = kmPorLitroDelUltimoTanque(entrada.cargas);
  if (kmPorLitro === null) return { estado: 'sin_consumo' };

  const kmDesdeCarga = Math.max(0, entrada.odometroActualKm - ultimaLlena.odometroKm);
  const litrosQuedan = Math.min(capacidad, Math.max(0, capacidad - kmDesdeCarga / kmPorLitro));
  return {
    estado: 'ok',
    fraccion: litrosQuedan / capacidad,
    litrosQuedan,
    autonomiaKm: litrosQuedan * kmPorLitro,
    kmPorLitro,
  };
}
