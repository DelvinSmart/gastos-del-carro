import { describe, expect, it } from 'vitest';
import { en } from '../locales/en';
import { es } from '../locales/es';
import { pt } from '../locales/pt';
import { idiomaDe, traducir } from '../traducir';

describe('traducciones', () => {
  it('cada idioma tiene las mismas llaves', () => {
    expect(Object.keys(pt).sort()).toEqual(Object.keys(es).sort());
    expect(Object.keys(en).sort()).toEqual(Object.keys(es).sort());
  });
  it('traduce una llave', () => expect(traducir('pt', 'tituloApp')).toBe('Gastos do carro'));
  it('un idioma que no existe usa español', () => expect(traducir('fr', 'tituloApp')).toBe('Gastos del carro'));
  it('reconoce el idioma del teléfono', () => expect([idiomaDe('pt-BR'), idiomaDe('en-US'), idiomaDe('es-AR'), idiomaDe('de')]).toEqual(['pt', 'en', 'es', 'es']));
});
