import { defineConfig } from 'vitest/config';

// Las pruebas de la app. Las de las reglas van aparte (necesitan el emulador): npm run test:reglas
export default defineConfig({ test: { include: ['src/**/*.test.ts'] } });
