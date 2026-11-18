// EL MOTOR DE DISEÑO: todos los valores de diseño de la app, en un solo lugar.
// Ninguna pantalla escribe un color, un radio o una separación a mano: los pide aquí.
// El candado (scripts/check-diseno.mjs) no deja subir código con colores escritos fuera de esta carpeta.

/** Colores, con nombre de lo que son (no de cómo se ven): así se puede cambiar el tema sin tocar las pantallas. */
export const colores = {
  fondo: '#0f141b',
  tarjeta: '#18212c',
  texto: '#e6edf3',
  tenue: '#8796aa',
  acento: '#7ee787',
  peligro: '#ff7b72',
} as const;

/** Forma: esquinas y bordes. */
export const forma = {
  radioTarjeta: 14,
  radioBoton: 999,       // "pastilla": bien redondo
  borde: 1,
} as const;

/** Separaciones: una sola regla para que todo se vea parejo. */
export const espacio = {
  hueco: 14,             // entre bloques
  relleno: 16,           // dentro de las tarjetas, igual a los dos lados
  chico: 8,              // entre piezas pequeñas (un ícono y su texto)
} as const;

/** Medidas de piezas: la barra de combustible ocupa como máximo este pedazo del ancho (0.75 = 75 %). */
export const medidas = {
  barraCombustibleMaxima: 0.75,
} as const;

/** Efectos: sombras y transparencias. */
export const efectos = {
  sombra: '0 10px 30px rgba(0, 0, 0, 0.35)',
  opacidadDesactivado: 0.45,
} as const;

/**
 * Un "estilo de tarjeta" armado con el motor: así lo LLAMA cualquier pantalla.
 * Si mañana el relleno pasa a 20, cambia aquí y cambia en toda la app.
 */
export function estiloTarjeta() {
  return {
    backgroundColor: colores.tarjeta,
    borderRadius: forma.radioTarjeta,
    borderWidth: forma.borde,
    padding: espacio.relleno,
    gap: espacio.hueco,
  };
}
