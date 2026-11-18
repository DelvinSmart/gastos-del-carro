import { describe, expect, it } from 'vitest';
import { formatoReal, sumarReales } from '../dinero';

describe('dinero', () => {
  it('0.1 + 0.2 da 0.3 exacto (en centavos)', () => expect(sumarReales([0.1, 0.2])).toBe(0.3));
  it('suma una lista de gastos', () => expect(sumarReales([150, 50.25, 30])).toBe(230.25));
  it('formato de Brasil', () => expect(formatoReal(239.6)).toBe('R$ 239,60'));
});
