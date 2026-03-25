/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching'
import { initializeApp } from "firebase/app"
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw"

declare let self: ServiceWorkerGlobalScope

// Workbox (IMPORTANTE)
precacheAndRoute(self.__WB_MANIFEST)

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA_xfDvWJWC0FZnCC6oxJ9udRoigMMBvh8",
  authDomain: "appwebp-add9f.firebaseapp.com",
  projectId: "appwebp-add9f",
  storageBucket: "appwebp-add9f.firebasestorage.app",
  messagingSenderId: "1064729157588",
  appId: "1:1064729157588:web:d4b03b3dfd902e3f468041"
}

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

// Firebase Background Messages
onBackgroundMessage(messaging, (payload) => {
  console.log("Mensaje en background:", payload)

  const title = payload.notification?.title || payload.data?.title || "Nueva notificación"
  
  const options = {
    body: payload.notification?.body || payload.data?.body,
    icon: "/pwa-192x192.png",
    badge: "/pwa-192x192.png"
  }

  self.registration.showNotification(title, options)
})
