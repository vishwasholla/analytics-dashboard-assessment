import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/analytics-dashboard-assessment/' // Commented out for local development
})

// To test responsivenes on small screen
// export default {
//   server: {
//     host: '0.0.0.0',
//     port: 5173
//   }
// }