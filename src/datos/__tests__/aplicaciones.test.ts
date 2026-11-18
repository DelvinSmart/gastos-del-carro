import { describe, expect, it } from 'vitest';
import { esPlataformaFija, inicialesDe, normalizarNombreEmpresa } from '../aplicaciones';

describe('nombre de Mi empresa', () => {
  it('quita los espacios de más', () => {
    expect(normalizarNombreEmpresa('  Thermomac  ')).toBe('Thermomac');
  });
  it('vacío devuelve vacío (la app vuelve a "Mi empresa")', () => {
    expect(normalizarNombreEmpresa('   ')).toBe('');
  });
  it('acepta hasta 2 palabras', () => {
    expect(normalizarNombreEmpresa('Refrigeración Silva')).toBe('Refrigeración Silva');
  });
  it('rechaza 3 palabras', () => {
    expect(normalizarNombreEmpresa('Refrigeración Silva Ltda')).toBeNull();
  });
  it('rechaza más de 24 letras', () => {
    expect(normalizarNombreEmpresa('Transportadoraaaaaaaaaaaaaaa')).toBeNull();
  });
});

describe('plataformas fijas', () => {
  it('extras, viajes particulares y Mi empresa no se borran', () => {
    expect(['extras', 'viajes_particulares', 'mi_empresa'].every(esPlataformaFija)).toBe(true);
  });
  it('Uber sí se puede borrar', () => {
    expect(esPlataformaFija('uber')).toBe(false);
  });
});

describe('iniciales', () => {
  it('dos palabras: la primera letra de cada una', () => expect(inicialesDe('Mi empresa')).toBe('ME'));
  it('una palabra: sus dos primeras letras', () => expect(inicialesDe('uber')).toBe('UB'));
  it('sin nombre: un +', () => expect(inicialesDe('  ')).toBe('+'));
});
