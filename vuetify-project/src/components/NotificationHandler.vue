<template>
  <!-- Snackbar que aparece cuando llega una notificación en primer plano -->
  <v-snackbar
    v-model="showSnackbar"
    :timeout="6000"
    color="primary"
    location="top right"
    elevation="4"
  >
    <div class="d-flex align-center ga-3">
      <v-icon icon="mdi-bell-ring" color="white"></v-icon>
      <div>
        <div class="font-weight-bold">{{ notification.title }}</div>
        <div class="text-body-2">{{ notification.body }}</div>
      </div>
    </div>

    <template #actions>
      <v-btn icon="mdi-close" variant="text" color="white" @click="showSnackbar = false"></v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { requestNotificationPermission, onForegroundMessage } from '@/config/firebase'

const showSnackbar = ref(false)
const notification = ref({ title: '', body: '' })

onMounted(async () => {
  // Pide permiso al usuario y obtiene el token
  const token = await requestNotificationPermission()
  if (token) {
    console.log('Notificaciones activadas. Token:', token)
  }

  // Escucha mensajes cuando la app está abierta
  onForegroundMessage((payload) => {
    console.log('Notificación recibida:', payload)
    notification.value = {
      title: payload.notification?.title || 'Nueva notificación',
      body: payload.notification?.body || ''
    }
    showSnackbar.value = true
      new Notification(
    payload.notification?.title || 'Nueva notificación',
    {
      body: payload.notification?.body,
      icon: '/pwa-192x192.png'
    }
  )
  })
})
</script>
