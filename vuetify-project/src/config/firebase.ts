import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

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

const VAPID_KEY = 'BJtGNnGZJvGnPw6hwPzgQdElAwGo93LNzkrdpmBQN9YoPhQZPL7vxSWaoR1oMJNGAZXM6DrOWUxm93kfbygNicM'

// Solicita permiso y obtiene el token FCM del dispositivo
export const requestNotificationPermission = async (): Promise<string | null> => {
  try {
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') {
      console.warn('Permiso de notificaciones denegado')
      return null
    }

    const token = await getToken(messaging, { vapidKey: VAPID_KEY })
    console.log('Token FCM:', token)
    return token
  } catch (error) {
    console.error('Error obteniendo token FCM:', error)
    return null
  }
}

// Escucha notificaciones cuando la app está en primer plano (tab activa)
export const onForegroundMessage = (callback: (payload: any) => void) => {
  return onMessage(messaging, callback)
}

export { messaging }
