import type { Caja } from '../modelos/tipos';
import type { RepositorioCaja } from './RepositorioCaja';

/** Guarda las cajas en un Map, en la memoria. Sirve para las pruebas y para aprender. */
export class RepositorioEnMemoria implements RepositorioCaja {
  #cajas = new Map<string, Caja>();

  async buscar(id: string): Promise<Caja | null> {
    const caja = this.#cajas.get(id);
    return caja ? structuredClone(caja) : null;      // una copia: nadie cambia lo guardado sin pasar por guardar()
  }

  async guardar(caja: Caja): Promise<void> {
    this.#cajas.set(caja.id, structuredClone(caja));
  }

  async listar(): Promise<Caja[]> {
    return [...this.#cajas.values()].map((c) => structuredClone(c));
  }
}
