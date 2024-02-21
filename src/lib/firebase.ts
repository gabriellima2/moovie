import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { firebaseConfig } from '@/config/firebase'

export const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
})
