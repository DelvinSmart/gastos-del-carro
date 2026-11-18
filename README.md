# Gastos del carro · proyecto de práctica

Una app pequeña, hecha para **practicar** con el [Mapa de estudios](https://delvinsmart.github.io/estudios/).
Tiene las mismas piezas que una app real en producción, pero en chico y en español:

| Pieza | Dónde está | Clase del mapa |
|---|---|---|
| Código en TypeScript para leer | `src/datos/aplicaciones.ts`, `src/utils/combustible.ts` | Leer código |
| Pruebas automáticas (Vitest) | `src/**/__tests__/` | Pruebas automáticas · Mi primera prueba |
| La revisión automática (CI) con candados | `.github/workflows/ci.yml`, `scripts/` | CI |
| Textos en tres idiomas | `src/i18n/` | Mi primer cambio |
| Reglas de seguridad de Firebase, probadas como atacante | `firebase/` | Firebase por dentro |
| Un módulo en capas: modelos → repositorio → servicio | `src/caja/` | Arquitectura |
| El motor de diseño (colores, forma, separaciones) | `src/tema/motor.ts` | El plano y la estructura |

## Descargarlo (una sola vez)

Necesitas **Node.js 22** (gratis, en [nodejs.org](https://nodejs.org)) y **Git**. En la terminal:

```bash
git clone https://github.com/DelvinSmart/gastos-del-carro.git
cd gastos-del-carro
npm install
```

- `git clone` baja una copia del proyecto a tu computadora.
- `cd` entra en la carpeta.
- `npm install` instala las herramientas que el proyecto usa (quedan en `node_modules/`, que no se sube a GitHub).

## Los comandos

| Comando | Qué hace |
|---|---|
| `npm test` | Corre las pruebas de la app |
| `npm run mostrar` | Dibuja la "pantalla" de la app en la terminal (`npm run mostrar -- pt` en portugués), con los textos y el motor de diseño |
| `npm run tipos` | TypeScript revisa los tipos de todo el proyecto |
| `npm run check:diseno` | Candado: ningún color escrito a mano fuera del motor |
| `npm run check:ciclos` | Candado: ningún archivo depende de otro en círculo |
| `npm run check:tamano` | Candado: ningún archivo pasa de 300 líneas |
| `npm run check:secretos` | Candado: ninguna clave secreta en el código |
| `npm run verificar` | Todo lo anterior, en orden (lo mismo que hace el CI) |
| `npm run test:reglas` | Las pruebas de las reglas de Firebase, con el emulador (necesita [Java](https://adoptium.net), gratis) |

## Cómo practicar

1. **Lee** un archivo de `src/` con la clase abierta al lado.
2. **Corre** `npm test` y mira todo en verde.
3. **Rompe algo a propósito** (cambia un `>` por `<`, borra una línea) y corre `npm test` otra vez: mira qué prueba falla y qué dice.
4. **Arréglalo** y vuelve a correr las pruebas.
5. Para cambios de verdad, trabaja en una **rama** (`git checkout -b practica/mi-cambio`), como en la clase de Git.

No hay nada que puedas romper para siempre: si te pierdes, `git checkout .` deja todo como estaba.

## La regla de este proyecto

Cada archivo tiene **una sola tarea**, los valores de diseño viven **solo** en el motor, y cada regla tiene **su prueba**.
Si agregas algo, sigue la misma regla: el CI te avisa si no.
