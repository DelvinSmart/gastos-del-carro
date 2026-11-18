import type { Caja } from '../modelos/tipos';
import type { RepositorioCaja } from '../repositorio/RepositorioCaja';

/**
 * Las REGLAS de la caja. No sabe dónde se guardan los datos: recibe un repositorio
 * (esto se llama inyección de dependencias, Tema 10). Por eso se prueba con el repositorio en memoria.
 */
export class ServicioCaja {
  constructor(private readonly repositorio: RepositorioCaja) {}

  async crear(id: string, nombre: string, cuota: number, miembros: string[]): Promise<Caja> {
    if (!(cuota > 0)) throw new Error('La cuota tiene que ser mayor que 0');
    if (miembros.length < 2) throw new Error('Una caja necesita al menos 2 personas');
    if (new Set(miembros).size !== miembros.length) throw new Error('Hay personas repetidas');
    const caja: Caja = { id, nombre, cuota, miembros: [...miembros], pagos: [] };
    await this.repositorio.guardar(caja);
    return caja;
  }

  async pagar(id: string, miembro: string, ronda: number, fecha: string): Promise<Caja> {
    const caja = await this.#cajaQueExiste(id);
    if (!caja.miembros.includes(miembro)) throw new Error(`${miembro} no es parte de la caja`);
    if (ronda < 1 || ronda > caja.miembros.length) throw new Error('Esa ronda no existe');
    if (caja.pagos.some((p) => p.miembro === miembro && p.ronda === ronda)) throw new Error('Ese pago ya está anotado');
    caja.pagos.push({ miembro, ronda, fecha });
    await this.repositorio.guardar(caja);
    return caja;
  }

  /** Quién recibe en una ronda: el miembro que está en esa posición. */
  quienRecibe(caja: Caja, ronda: number): string | null {
    return caja.miembros[ronda - 1] ?? null;
  }

  /** Quiénes todavía no pagaron una ronda. */
  faltanPagar(caja: Caja, ronda: number): string[] {
    return caja.miembros.filter((m) => !caja.pagos.some((p) => p.miembro === m && p.ronda === ronda));
  }

  /** Cuánto recibe la persona de la ronda cuando todos pagan. */
  totalDeLaRonda(caja: Caja): number {
    return caja.cuota * caja.miembros.length;
  }

  async #cajaQueExiste(id: string): Promise<Caja> {
    const caja = await this.repositorio.buscar(id);
    if (!caja) throw new Error('Esa caja no existe');
    return caja;
  }
}
