import { defineConfig } from 'vitest/config';

export default defineConfig({ test: { include: ['firebase/pruebas/**/*.test.ts'], testTimeout: 20000 } });
