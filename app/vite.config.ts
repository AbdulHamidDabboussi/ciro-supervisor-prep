import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: served from https://<user>.github.io/ciro-supervisor-prep/
// The base path can be overridden at build time (e.g. for a custom domain) via VITE_BASE.
const base = process.env.VITE_BASE ?? '/ciro-supervisor-prep/'

export default defineConfig({
  base,
  plugins: [react()],
})
