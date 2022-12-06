import { defineConfig, PluginOption } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    publicDir: 'public',
    define: { 'process.env': {} },
    base: './',
    build: {
        target: 'es2015',
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    server: {
        // host: ''
    },
    plugins: [
    ],
    // build: {
    //     rollupOptions: {
    //         input: {
    //             app: './Index.cshtml'
    //         }
    //     }
    // }
});
