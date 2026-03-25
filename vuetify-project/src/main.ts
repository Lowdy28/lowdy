/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Registro del Service Worker para cumplir requisitos de PWA
import { registerSW } from 'virtual:pwa-register'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

// Registro del Service Worker con recarga automática al haber actualización
registerSW({
  immediate: true,
  onOfflineReady() {
    // El SW ya tiene los recursos cacheados: la app puede funcionar offline
    console.log('PWA lista para uso offline')
  },
  onNeedRefresh() {
    // Hay una nueva versión disponible, se actualiza automáticamente
    console.log('Nueva versión disponible, actualizando...')
  }
})

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
