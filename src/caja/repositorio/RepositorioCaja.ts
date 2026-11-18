import type { Caja } from '../modelos/tipos';

/**
 * El CONTRATO del repositorio: qué se puede hacer con los datos, sin decir dónde viven.
 * El servicio solo conoce esta interfaz. Hoy hay una versión en memoria (para pruebas);
 * mañana puede haber una con Firebase, y el servicio no cambia ni una línea (Tema 10).
 */
export interface RepositorioCaja {
  buscar(id: string): Promise<Caja | null>;
  guardar(caja: Caja): Promise<void>;
  listar(): Promise<Caja[]>;
}
