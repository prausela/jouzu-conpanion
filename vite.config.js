import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        cors: false
    },
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                "short_name": "上手・コンパ",
                "name": "上手・コンパニオン",
                "icons": [
                    {
                    "src": "favicon.ico",
                    "sizes": "64x64 32x32 24x24 16x16",
                    "type": "image/x-icon"
                    },
                    {
                    "src": "logo192.png",
                    "type": "image/png",
                    "sizes": "192x192"
                    },
                    {
                    "src": "logo512.png",
                    "type": "image/png",
                    "sizes": "512x512"
                    }
                ],
                "start_url": ".",
                "display": "standalone",
                "theme_color": "#000000",
                "background_color": "#ffffff"
            }
        })
    ],
})
