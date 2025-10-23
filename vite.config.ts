import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  
  // TODO: Configure Vite for your JSX setup
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'createFragment',
  },

  // TODO: Configure build options
  build: {
    outDir: 'dist',
    minify: true, 
  },

  // TODO: Set up dev server
  server: {
    port: 5173,     
    open: true, 
  }
});
