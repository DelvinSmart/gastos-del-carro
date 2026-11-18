import { describe, expect, it } from 'vitest';
import { colores, espacio, estiloTarjeta, forma } from '../motor';

describe('el motor de diseño', () => {
  it('la tarjeta usa los valores del motor', () => {
    expect(estiloTarjeta()).toEqual({ backgroundColor: colores.tarjeta, borderRadius: forma.radioTarjeta, borderWidth: forma.borde, padding: espacio.relleno, gap: espacio.hueco });
  });
  it('todos los colores son hexadecimales', () => {
    expect(Object.values(colores).every((c) => /^#[0-9a-f]{6}$/i.test(c))).toBe(true);
  });
});
