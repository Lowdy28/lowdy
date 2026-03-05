<template>
  <v-container class="fill-height d-flex align-center justify-center">
    
    <v-card 
      elevation="8" 
      width="100%" 
      max-width="400" 
      class="pa-6 rounded-lg"
    >
      <v-card-item class="justify-center">
        <v-icon size="large" color="primary" icon="mdi-account-circle" class="mb-2"></v-icon>
        <v-card-title class="text-h5 font-weight-bold">Bienvenido</v-card-title>
        <v-card-subtitle>Ingresa tus credenciales para continuar</v-card-subtitle>
      </v-card-item>

      <v-card-text class="mt-4">
        <v-form validate-on="submit lazy" @submit.prevent="handleLogin">
          
          <v-text-field
            v-model="userEmail"
            :rules="validationRules"
            label="Usuario"
            variant="outlined"
            prepend-inner-icon="mdi-account-outline"
            color="primary"
            class="mb-2"
            clearable
          ></v-text-field>

          <v-text-field
            v-model="userPassword"
            :rules="validationRules"
            label="Contraseña"
            :type="passwordVisible ? 'text' : 'password'"
            variant="outlined"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="passwordVisible = !passwordVisible"
            color="primary"
          ></v-text-field>

          <v-expand-transition>
            <v-alert
              v-if="alertMessage"
              type="error"
              variant="tonal"
              density="compact"
              class="mt-4 mb-2"
              closable
              @click:close="alertMessage = ''"
            >
              {{ alertMessage }}
            </v-alert>
          </v-expand-transition>

          <v-btn
            :loading="isLoading"
            class="mt-6 text-none font-weight-bold"
            color="primary"
            size="large"
            type="submit"
            block
            rounded="pill"
            elevation="2"
          >
            <v-icon left class="mr-2">mdi-login</v-icon>
            Iniciar sesión
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from '../config/axios' // Asegúrate que esta ruta sea correcta en tu proyecto
import { useRouter } from 'vue-router'

const router = useRouter()

const userEmail = ref('')
const userPassword = ref('')
const alertMessage = ref('')
const isLoading = ref(false)
const passwordVisible = ref(false)

const validationRules = [
  value => !!value || 'Campo requerido'
]

// Esta es TU lógica exacta, con tus console.logs
const handleLogin = async() => {
  alertMessage.value = ''
  isLoading.value = true
  
  try {
    if (!userEmail.value || !userPassword.value) {
      alertMessage.value = "Completar los datos correctamente"
      return
    }
    
    // Petición exacta
    const response = await axios.post('/login', {
      email: userEmail.value,
      password: userPassword.value
    })

    // TUS LOGS (no los borré esta vez)
    console.log('Respuesta completa:', response.data)
    console.log('Valor de acceso:', response.data.acceso)
    console.log('Tipo de acceso:', typeof response.data.acceso)
    
    // Tu validación exacta
    if (response.data.acceso && response.data.token) {
      localStorage.setItem('token', response.data.token)
      await router.push('/home')
    } else {
      alertMessage.value = 'Usuario o contraseña incorrectos'
    }
      
  } catch(error) {
    console.error('Error en login:', error)
    alertMessage.value = "Ocurrió un error al conectarse con el servidor"
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Tu estilo de fondo original */
:global(body) {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  height: 100vh; /* Asegura que cubra toda la pantalla */
  margin: 0;
}
</style>