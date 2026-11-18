import { beforeEach, describe, expect, it } from 'vitest';
import { RepositorioEnMemoria } from '../repositorio/RepositorioEnMemoria';
import { ServicioCaja } from '../servicio/ServicioCaja';

describe('la caja de ahorro', () => {
  let servicio: ServicioCaja;
  beforeEach(() => { servicio = new ServicioCaja(new RepositorioEnMemoria()); });

  it('se crea con su cuota y sus miembros', async () => {
    const caja = await servicio.crear('c1', 'Caja de los taxistas', 100, ['Ana', 'Beto', 'Caro']);
    expect(servicio.totalDeLaRonda(caja)).toBe(300);
  });
  it('en la ronda 2 recibe el segundo', async () => {
    const caja = await servicio.crear('c1', 'Caja', 100, ['Ana', 'Beto', 'Caro']);
    expect(servicio.quienRecibe(caja, 2)).toBe('Beto');
  });
  it('dice quién falta pagar', async () => {
    await servicio.crear('c1', 'Caja', 100, ['Ana', 'Beto', 'Caro']);
    const caja = await servicio.pagar('c1', 'Ana', 1, '2026-11-18');
    expect(servicio.faltanPagar(caja, 1)).toEqual(['Beto', 'Caro']);
  });
  it('no deja pagar dos veces la misma ronda', async () => {
    await servicio.crear('c1', 'Caja', 100, ['Ana', 'Beto']);
    await servicio.pagar('c1', 'Ana', 1, '2026-11-18');
    await expect(servicio.pagar('c1', 'Ana', 1, '2026-11-18')).rejects.toThrow('Ese pago ya está anotado');
  });
  it('rechaza a alguien que no es de la caja', async () => {
    await servicio.crear('c1', 'Caja', 100, ['Ana', 'Beto']);
    await expect(servicio.pagar('c1', 'Zoe', 1, '2026-11-18')).rejects.toThrow('Zoe no es parte de la caja');
  });
  it('rechaza una cuota de 0 y una caja de una sola persona', async () => {
    await expect(servicio.crear('c1', 'Caja', 0, ['Ana', 'Beto'])).rejects.toThrow('La cuota');
    await expect(servicio.crear('c1', 'Caja', 10, ['Ana'])).rejects.toThrow('al menos 2');
  });
});
