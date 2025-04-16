import { defineConfig } from 'vite';

export default defineConfig({
    base: '/becksons.github.io/',
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser']
                }
            }
        },
    },
    server: {
        port: 8080
    }
});
