import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server :{
    // host: "10.48.0.5",
    host: "10.0.60.43",
    port: "3000",
  }


  
})

