#!/usr/bin/env node
// Candado de tamaño: ningún archivo de src/ pasa de MAX_LINEAS. Un archivo gigante es código espagueti en potencia.
// Las pruebas quedan afuera. Si falla, dice qué archivo y cuántas líneas tiene.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_LINEAS = 300;
const archivos = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? (e.name === '__tests__' ? [] : archivos(join(dir, e.name))) : [join(dir, e.name)]);

const grandes = archivos('src')
  .filter((f) => f.endsWith('.ts'))
  .map((f) => [f, readFileSync(f, 'utf8').split('\n').length])
  .filter(([, n]) => n > MAX_LINEAS);

for (const [f, n] of grandes) console.error(`✖ ${f}: ${n} líneas (máximo ${MAX_LINEAS})`);
if (grandes.length) process.exit(1);
console.log(`✓ ningún archivo pasa de ${MAX_LINEAS} líneas`);
