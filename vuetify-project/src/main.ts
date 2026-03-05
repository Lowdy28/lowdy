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

// Activación inmediata del Service Worker
registerSW({ immediate: true })

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
