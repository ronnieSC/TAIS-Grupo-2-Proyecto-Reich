/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
//import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  test: {
    environment: "happy-dom",
  },
  plugins: [react()],
  server: {
    host: true, 
    port: 5173
  }
}))
