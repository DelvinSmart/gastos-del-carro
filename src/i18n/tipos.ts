// Los textos de la app NUNCA se escriben directo en la pantalla: se piden por una llave (Tema 05).
// Este tipo es la lista de llaves: si un idioma se olvida de una, TypeScript avisa.

export type Idioma = 'es' | 'pt' | 'en';

export interface Diccionario {
  tituloApp: string;
  agregarGasto: string;
  totalSemana: string;
  sinGastos: string;
  valorInvalido: string;
}
