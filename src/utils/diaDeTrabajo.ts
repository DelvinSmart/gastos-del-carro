// El "día de trabajo" de un conductor no termina a la medianoche: quien maneja hasta las 2 de la mañana
// sigue en la jornada del día anterior. Aquí el día de trabajo cambia a las 4:00.
// Es un buen ejemplo de una regla con fechas que se prueba sola (Temas 02 y 03).

export const HORA_CAMBIO_DE_DIA = 4;

const dos = (n: number): string => String(n).padStart(2, '0');

/** La fecha (AAAA-MM-DD) del día de trabajo al que pertenece un momento. */
export function diaDeTrabajo(momento: Date): string {
  const d = new Date(momento);
  if (d.getHours() < HORA_CAMBIO_DE_DIA) d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}`;
}
