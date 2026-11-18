// La "pantalla" de la app, dibujada en la terminal: npm run mostrar        (español)
//                                                    npm run mostrar -- pt  (portugués) · -- en (inglés)
// Usa los textos de src/i18n y las medidas del motor (src/tema/motor.ts): si cambias un texto o una medida,
// lo ves aquí. Es para practicar la clase "Mi primer cambio" sin un simulador de teléfono.
import { traducir, idiomaDe } from '../src/i18n/traducir';
import { espacio, medidas } from '../src/tema/motor';
import { formatoReal } from '../src/utils/dinero';

const idioma = idiomaDe(process.argv[2] ?? 'es');
const t = (llave: Parameters<typeof traducir>[1]) => traducir(idioma, llave);

const ANCHO = 40;                                          // el ancho de la "pantalla", en letras
const margen = ' '.repeat(Math.round(espacio.relleno / 4)); // el relleno del motor, en espacios
const fila = (texto = '') => `│${margen}${texto.padEnd(ANCHO - margen.length * 2)}${margen}│`;

const nivel = 0.6;                                         // 60 % de combustible, de ejemplo
const largoBarra = Math.round((ANCHO - margen.length * 2) * medidas.barraCombustibleMaxima);
const llenos = Math.round(largoBarra * nivel);
const barra = '█'.repeat(llenos) + '░'.repeat(largoBarra - llenos);

console.log(`╭${'─'.repeat(ANCHO)}╮`);
console.log(fila(t('tituloApp')));
console.log(fila());
console.log(fila(`${t('totalSemana')}: ${formatoReal(180)}`));
console.log(fila(barra));
console.log(fila(t('sinGastos')));
console.log(fila());
console.log(fila(`[ ${t('agregarGasto')} ]`));
console.log(`╰${'─'.repeat(ANCHO)}╯`);
