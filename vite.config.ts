import { defineConfig } from 'vite';
import restart from 'vite-plugin-restart';

// Export the Vite config using defineConfig to enable type checking
export default defineConfig({
  root: 'src/', // Source files (typically where index.html is)
  publicDir: '../static/', // Path from "root" to static assets

  server: {
    host: true, // Open to local network and display URL
    open: !(
      'SANDBOX_URL' in process.env ||
      'CODESANDBOX_HOST' in process.env
    ), // Open if not in CodeSandbox
  },

  build: {
    outDir: '../dist', // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
  },

  plugins: [
    restart({
      restart: ['../static/**'], // Restart server on static file change
    }),
  ],
});
