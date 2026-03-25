<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <NotificationHandler />
  </v-app>
</template>

<script lang="ts" setup>
import NotificationHandler from './components/NotificationHandler.vue'
</script>
