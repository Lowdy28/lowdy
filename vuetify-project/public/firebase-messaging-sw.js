importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: "AIzaSyA_xfDvWJWC0FZnCC6oxJ9udRoigMMBvh8",
  authDomain: "appwebp-add9f.firebaseapp.com",
  projectId: "appwebp-add9f",
  storageBucket: "appwebp-add9f.firebasestorage.app",
  messagingSenderId: "1064729157588",
  appId: "1:1064729157588:web:d4b03b3dfd902e3f468041"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('Notificación en background:', payload)

  const title = payload.notification?.title || payload.data?.title || 'Nueva notificación'
  const body = payload.notification?.body || payload.data?.body || ''

  // Forzar mostrar la notificación del sistema operativo
  return self.registration.showNotification(title, {
    body: body,
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    vibrate: [200, 100, 200]
  })
})
