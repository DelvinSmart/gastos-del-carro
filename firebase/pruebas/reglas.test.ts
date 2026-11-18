// Pruebas de las reglas, con el emulador de Firestore (gratis, en tu computadora): npm run test:reglas
// Necesitas Java instalado. Cada "trampa" tiene que fallar (assertFails) y lo correcto tiene que pasar (assertSucceeds).
import { assertFails, assertSucceeds, initializeTestEnvironment, type RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { readFileSync } from 'node:fs';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';

let entorno: RulesTestEnvironment;
const gasto = { tipo: 'lavado', valor: 30, fecha: '2026-11-18' };

beforeAll(async () => {
  entorno = await initializeTestEnvironment({
    projectId: 'demo-gastos',
    firestore: { rules: readFileSync('firebase/firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 },
  });
});
beforeEach(async () => { await entorno.clearFirestore(); });
afterAll(async () => { await entorno.cleanup(); });

const como = (uid: string) => entorno.authenticatedContext(uid).firestore();
const sinSesion = () => entorno.unauthenticatedContext().firestore();

describe('reglas de los gastos', () => {
  it('Ana guarda y lee su gasto', async () => {
    await assertSucceeds(setDoc(doc(como('ana'), 'usuarios/ana/gastos/g1'), gasto));
    await assertSucceeds(getDoc(doc(como('ana'), 'usuarios/ana/gastos/g1')));
  });
  it('trampa: Beto lee el gasto de Ana', async () => {
    await assertFails(getDoc(doc(como('beto'), 'usuarios/ana/gastos/g1')));
  });
  it('trampa: Beto escribe en los gastos de Ana', async () => {
    await assertFails(setDoc(doc(como('beto'), 'usuarios/ana/gastos/g1'), gasto));
  });
  it('trampa: sin sesión no se lee nada', async () => {
    await assertFails(getDoc(doc(sinSesion(), 'usuarios/ana/gastos/g1')));
  });
  it('trampa: un valor negativo', async () => {
    await assertFails(setDoc(doc(como('ana'), 'usuarios/ana/gastos/g2'), { ...gasto, valor: -5 }));
  });
  it('trampa: un tipo inventado', async () => {
    await assertFails(setDoc(doc(como('ana'), 'usuarios/ana/gastos/g3'), { ...gasto, tipo: 'pizza' }));
  });
  it('trampa: un campo de más (por ejemplo, "admin")', async () => {
    await assertFails(setDoc(doc(como('ana'), 'usuarios/ana/gastos/g4'), { ...gasto, admin: true }));
  });
  it('Ana borra su gasto; Beto no puede', async () => {
    await entorno.withSecurityRulesDisabled(async (ctx) => { await setDoc(doc(ctx.firestore(), 'usuarios/ana/gastos/g5'), gasto); });
    await assertFails(deleteDoc(doc(como('beto'), 'usuarios/ana/gastos/g5')));
    await assertSucceeds(deleteDoc(doc(como('ana'), 'usuarios/ana/gastos/g5')));
  });
  it('trampa: escribir fuera de usuarios/', async () => {
    await assertFails(setDoc(doc(como('ana'), 'config/global'), { mantenimiento: true }));
  });
});
