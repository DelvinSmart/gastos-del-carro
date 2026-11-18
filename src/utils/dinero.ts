// El dinero se cuenta en CENTAVOS (números enteros): 0.1 + 0.2 no da 0.3 exacto, pero 10 + 20 sí da 30.
// Una sola regla para toda la app: por eso es corta y está en su propio archivo (Tema 01).

export const aCentavos = (reales: number): number => Math.round(reales * 100);
export const aReales = (centavos: number): number => centavos / 100;

/** Suma valores en reales sin errores de decimales. */
export function sumarReales(valores: readonly number[]): number {
  return aReales(valores.reduce((total, v) => total + aCentavos(v), 0));
}

/** 239.6 → 'R$ 239,60' (como se escribe en Brasil). */
export function formatoReal(valor: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor).replace(/ /g, ' ');
}
