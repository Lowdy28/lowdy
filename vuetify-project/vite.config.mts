import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    // Configuración completa de la PWA para el profesor
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Sistema de Gestión de Productos',
        short_name: 'ProductosApp',
        description: 'Aplicación PWA para la gestión de inventario y productos',
        theme_color: '#1976D2',
        background_color: '#ffffff',
        display: 'standalone', // Requisito: Ejecutarse como app independiente
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },
      // ── Estrategias de cacheo con Workbox ──────────────────────────────────
      workbox: {
        // Cachea automáticamente los archivos generados por Vite (JS, CSS, HTML)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],

        runtimeCaching: [
          // Estrategia: Cache First para fuentes de Google
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Estrategia: Network First para llamadas a la API
          // Intenta la red primero; si falla (offline) usa la caché
          {
            urlPattern: /^http:\/\/127\.0\.0\.1:8000\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 5, // Si la red tarda más de 5s, usa caché
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60, // 1 hora
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      // ──────────────────────────────────────────────────────────────────────
      devOptions: {
        enabled: true,
        type: 'module'// Permite probar la PWA mientras desarrollas
      }
    }),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
    Fonts({
      fontsource: {
        families: [
          {
            name: 'Roboto',
            weights: [100, 300, 400, 500, 700, 900],
            styles: ['normal', 'italic'],
          },
        ],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: [
      'postethmoid-decanically-ursula.ngrok-free.dev'
    ]
  },
})
