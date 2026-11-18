import { en } from './locales/en';
import { es } from './locales/es';
import { pt } from './locales/pt';
import type { Diccionario, Idioma } from './tipos';

const DICCIONARIOS: Record<Idioma, Diccionario> = { es, pt, en };

/** El texto de una llave en un idioma. Si el idioma no existe, se usa español. */
export function traducir(idioma: string, llave: keyof Diccionario): string {
  const diccionario = DICCIONARIOS[idioma as Idioma] ?? DICCIONARIOS.es;
  return diccionario[llave];
}

/** "pt-BR" → 'pt'; "en-US" → 'en'; lo demás → 'es'. */
export function idiomaDe(codigoDelTelefono: string): Idioma {
  const base = codigoDelTelefono.toLowerCase().split('-')[0];
  return base === 'pt' || base === 'en' ? base : 'es';
}
