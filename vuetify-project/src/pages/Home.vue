<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-8 text-center rounded-lg" elevation="8" max-width="500">
      <v-icon size="64" color="success" class="mb-4">mdi-check-circle-outline</v-icon>
      
      <h2 class="text-h4 font-weight-bold mb-2">¡Bienvenido!</h2>
      <p class="text-body-1 text-grey-darken-1 mb-6">
        Has iniciado sesión correctamente.
      </p>

      <v-btn color="error" variant="outlined" rounded="pill" @click="logout">
        Cerrar Sesión
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/') 
}
</script>