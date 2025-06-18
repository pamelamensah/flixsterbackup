import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
process.env.DATABASE_HOSTED_URL
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
