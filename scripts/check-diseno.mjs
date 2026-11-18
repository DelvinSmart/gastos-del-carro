#!/usr/bin/env node
// Candado de diseño: fuera de src/tema/, ningún archivo escribe un color a mano (#abc, #aabbcc, rgb(…)).
// Todos los colores salen del motor (src/tema/motor.ts). Si falla, dice el archivo y la línea.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const COLOR_A_MANO = /['"`]#[0-9a-f]{3,8}['"`]|\brgba?\(\s*\d/i;
const archivos = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? (['__tests__', 'tema'].includes(e.name) ? [] : archivos(join(dir, e.name))) : [join(dir, e.name)]);

const faltas = archivos('src').filter((f) => f.endsWith('.ts')).flatMap((f) =>
  readFileSync(f, 'utf8').split('\n').flatMap((linea, i) => (COLOR_A_MANO.test(linea) ? [`${f}:${i + 1}  ${linea.trim()}`] : [])));

for (const falta of faltas) console.error(`✖ color escrito a mano (usa el motor de src/tema): ${falta}`);
if (faltas.length) process.exit(1);
console.log('✓ ningún color escrito a mano fuera del motor');
