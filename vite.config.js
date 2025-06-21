import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server :{
    host: "134.199.184.239",
    // host: "10.0.60.43",
    port: "3000",
  }


  
})

