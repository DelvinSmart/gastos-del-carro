// El catálogo de las apps con las que trabaja un conductor, y las reglas de su nombre.
// Lo estudias en el Tema 01 (leer código) y le escribes pruebas en el Tema 03.

export type IdApp = 'uber' | '99' | 'indrive' | 'extras' | 'viajes_particulares' | 'mi_empresa';

export interface App {
  id: IdApp;
  nombre: string;
}

export const APPS: readonly App[] = [
  { id: 'uber', nombre: 'Uber' },
  { id: '99', nombre: '99' },
  { id: 'indrive', nombre: 'InDrive' },
  { id: 'extras', nombre: 'Extras' },
  { id: 'viajes_particulares', nombre: 'Viajes particulares' },
  { id: 'mi_empresa', nombre: 'Mi empresa' },
];

/** El nombre de "Mi empresa" entra en un letrero: máximo 2 palabras y 24 letras. */
export const NOMBRE_EMPRESA_MAX_PALABRAS = 2;
export const NOMBRE_EMPRESA_MAX_LETRAS = 24;

/**
 * Limpia el nombre que escribe la persona para "Mi empresa".
 * - Junta los espacios de más y quita los de las puntas.
 * - Vacío → '' (la app vuelve a mostrar "Mi empresa").
 * - Más de 24 letras o más de 2 palabras → null (no es válido).
 */
export function normalizarNombreEmpresa(texto: string): string | null {
  const limpio = texto.replace(/\s+/g, ' ').trim();
  if (!limpio) return '';
  if (limpio.length > NOMBRE_EMPRESA_MAX_LETRAS) return null;
  if (limpio.split(' ').length > NOMBRE_EMPRESA_MAX_PALABRAS) return null;
  return limpio;
}

/** Las plataformas que vienen con la app no se pueden borrar ni renombrar. */
export function esPlataformaFija(id: string): boolean {
  return id === 'extras' || id === 'viajes_particulares' || id === 'mi_empresa';
}

/** Iniciales para el circulito de cada app: "Mi empresa" → "ME", "Uber" → "UB". */
export function inicialesDe(nombre: string): string {
  const palabras = nombre.trim().split(/\s+/).filter(Boolean);
  if (palabras.length === 0) return '+';
  if (palabras.length === 1) return (palabras[0] ?? '').slice(0, 2).toUpperCase();
  return `${palabras[0]?.[0] ?? ''}${palabras[1]?.[0] ?? ''}`.toUpperCase();
}
