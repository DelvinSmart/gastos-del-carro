import { describe, expect, it } from 'vitest';
import { diaDeTrabajo } from '../diaDeTrabajo';

describe('día de trabajo', () => {
  it('a las 10 de la mañana es el mismo día', () => expect(diaDeTrabajo(new Date(2026, 10, 18, 10))).toBe('2026-11-18'));
  it('a las 2 de la madrugada todavía es el día anterior', () => expect(diaDeTrabajo(new Date(2026, 10, 18, 2))).toBe('2026-11-17'));
  it('a las 4 en punto ya es el día nuevo', () => expect(diaDeTrabajo(new Date(2026, 10, 18, 4))).toBe('2026-11-18'));
  it('el 1 de enero a la 1 de la madrugada es del año anterior', () => expect(diaDeTrabajo(new Date(2027, 0, 1, 1))).toBe('2026-12-31'));
});
