<template>
  <v-container class="fill-height bg-grey-lighten-4" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        
        <v-card class="pa-6 rounded-xl text-center mb-6" elevation="3">
          <v-avatar color="success-lighten-4" size="80" class="mb-4">
            <v-icon size="48" color="success">mdi-account-check</v-icon>
          </v-avatar>
          
          <h2 class="text-h4 font-weight-black mb-2 text-blue-grey-darken-4">
            ¡Hola de nuevo!
          </h2>
          <p class="text-body-1 text-grey-darken-1">
            Has accedido al sistema correctamente. ¿Qué deseas hacer hoy?
          </p>
        </v-card>

        <v-row>
          <v-col cols="12" sm="6">
            <v-card 
              link 
              @click="router.push('/productos')" 
              class="pa-6 rounded-xl transition-swing" 
              elevation="2"
              hover
            >
              <v-icon size="40" color="primary" class="mb-3">mdi-package-variant-closed</v-icon>
              <h3 class="text-h6 font-weight-bold">Inventario</h3>
              <p class="text-caption text-grey">Gestiona tus productos, precios e impuestos.</p>
              <v-divider class="my-3"></v-divider>
              <div class="text-button text-primary d-flex align-center">
                Ir a Productos <v-icon icon="mdi-chevron-right"></v-icon>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card 
              variant="outlined"
              class="pa-6 rounded-xl border-dashed" 
            >
              <v-icon size="40" color="grey" class="mb-3">mdi-cog-outline</v-icon>
              <h3 class="text-h6 font-weight-bold text-grey">Ajustes</h3>
              <p class="text-caption text-grey">Configuración general del perfil (Próximamente).</p>
            </v-card>
          </v-col>
        </v-row>

        <div class="text-center mt-8">
          <v-btn 
            color="red-lighten-1" 
            variant="text" 
            prepend-icon="mdi-logout"
            @click="logout"
          >
            Finalizar sesión de forma segura
          </v-btn>
        </div>

      </v-col>
    </v-row>
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

<style scoped>
.transition-swing {
  transition: transform 0.2s ease-in-out;
}
.transition-swing:hover {
  transform: translateY(-5px);
}
.border-dashed {
  border: 2px dashed #ccc !important;
}
</style>
