#!/usr/bin/env node
// Candado de secretos: busca claves que nunca deberían subirse a GitHub (llaves privadas, tokens).
// No es perfecto: es una red de seguridad, no un permiso para ser descuidado (curso de seguridad).
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const PATRONES = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'llave privada'],
  [/ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{40,}/, 'llave de GitHub'],
  [/sk-[A-Za-z0-9]{32,}/, 'llave de una API'],
  [/AKIA[0-9A-Z]{16}/, 'llave de AWS'],
];
const IGNORAR = new Set(['node_modules', '.git']);
const archivos = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  IGNORAR.has(e.name) ? [] : e.isDirectory() ? archivos(join(dir, e.name)) : [join(dir, e.name)]);

const hallazgos = archivos('.').filter((f) => /\.(ts|js|mjs|json|md|yml|rules)$/.test(f) && f !== 'scripts/check-secretos.mjs').flatMap((f) =>
  PATRONES.flatMap(([re, nombre]) => (re.test(readFileSync(f, 'utf8')) ? [`${f}: parece una ${nombre}`] : [])));

for (const h of hallazgos) console.error(`✖ ${h}`);
if (hallazgos.length) process.exit(1);
console.log('✓ no hay secretos a la vista');
