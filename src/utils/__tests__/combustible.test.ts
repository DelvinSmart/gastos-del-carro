import { describe, expect, it } from 'vitest';
import { estimarNivel, kmPorLitroDelUltimoTanque, leerCapacidad, type Carga } from '../combustible';

const carga = (fecha: string, litros: number, odometroKm: number, tanqueLleno = true): Carga =>
  ({ id: fecha, fecha, litros, odometroKm, tanqueLleno });

describe('leer la capacidad del tanque', () => {
  it('acepta coma o punto', () => {
    expect(leerCapacidad('45,5')).toBe(45.5);
    expect(leerCapacidad('45.5')).toBe(45.5);
  });
  it('rechaza texto, vacío y valores fuera de 1–200', () => {
    expect([leerCapacidad('abc'), leerCapacidad(''), leerCapacidad('0'), leerCapacidad('250')]).toEqual([null, null, null, null]);
  });
});

describe('consumo del último tanque', () => {
  it('km rodados entre dos tanques llenos / litros de la segunda carga', () => {
    expect(kmPorLitroDelUltimoTanque([carga('2026-11-01', 40, 10000), carga('2026-11-08', 40, 10480)])).toBe(12);
  });
  it('con una sola carga no se sabe', () => {
    expect(kmPorLitroDelUltimoTanque([carga('2026-11-01', 40, 10000)])).toBeNull();
  });
});

describe('nivel de combustible', () => {
  const cargas = [carga('2026-11-01', 40, 10000), carga('2026-11-08', 40, 10480)];   // 12 km/L

  it('sin capacidad, avisa que falta', () => {
    expect(estimarNivel({ capacidadLitros: null, cargas, odometroActualKm: 10480 })).toEqual({ estado: 'falta_capacidad' });
  });
  it('sin cargas, avisa que no hay de dónde partir', () => {
    expect(estimarNivel({ capacidadLitros: 50, cargas: [], odometroActualKm: 0 })).toEqual({ estado: 'sin_carga' });
  });
  it('recién cargado, el tanque está lleno', () => {
    const r = estimarNivel({ capacidadLitros: 50, cargas, odometroActualKm: 10480 });
    expect(r.estado === 'ok' && r.fraccion).toBe(1);
  });
  it('después de 300 km a 12 km/L quedan 25 litros', () => {
    const r = estimarNivel({ capacidadLitros: 50, cargas, odometroActualKm: 10780 });
    expect(r.estado === 'ok' && r.litrosQuedan).toBe(25);
    expect(r.estado === 'ok' && r.autonomiaKm).toBe(300);
  });
  it('nunca baja de 0', () => {
    const r = estimarNivel({ capacidadLitros: 50, cargas, odometroActualKm: 20000 });
    expect(r.estado === 'ok' && r.litrosQuedan).toBe(0);
  });
});
