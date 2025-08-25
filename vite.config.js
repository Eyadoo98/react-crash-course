import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  base: "/react-crash-course/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  server :{
    port:3000,
    proxy: {
      '/api':{
        target:'http://localhost:8081',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/,''),
      }
    }
  },
  theme:{
    extend:{
      fontFamily:{
        sans:['Roboto','sans-serif']
      },
      gridTemplateColumns:{
        '70/30':'70% 28%'
      }
    }
  }
})
