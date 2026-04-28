import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig({
  plugins: [react()],
  base: '/Nihongo-Learning/', // <--- ADD THIS LINE (Match your repo name)
})
