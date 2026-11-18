// La "caja": un grupo que ahorra junto. Cada ronda, todos pagan la cuota y una persona recibe todo
// (en otros países se llama san, junta, tanda o natillera). Este módulo está armado en capas,
// como se explica en el Tema 10 (arquitectura): modelos → repositorio → servicio.

export interface Caja {
  id: string;
  nombre: string;
  cuota: number;               // lo que paga cada persona en cada ronda (en reales)
  miembros: string[];          // en orden: el primero recibe en la ronda 1, el segundo en la 2…
  pagos: Pago[];
}

export interface Pago {
  miembro: string;
  ronda: number;               // empieza en 1
  fecha: string;               // AAAA-MM-DD
}
