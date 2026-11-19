import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import {
	initializeAuth,
	getReactNativePersistence,
	type Auth,
} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { firebaseConfig } from '@/config/firebase'
import { isFirebaseConfigured } from '@/config/is-firebase-configured'

export let app: FirebaseApp | undefined
export let db: Firestore | undefined
export let auth: Auth | undefined

if (isFirebaseConfigured()) {
	app = initializeApp(firebaseConfig)
	db = getFirestore(app)
	auth = initializeAuth(app, {
		persistence: getReactNativePersistence(AsyncStorage),
	})
	auth.useDeviceLanguage()
} else if (__DEV__) {
	console.warn(
		'[moovie] Firebase não configurado: preencha EXPO_PUBLIC_* no .env e reinicie o Metro (expo start --clear).'
	)
}

export function requireAuth(): Auth {
	if (!auth) {
		throw new Error(
			'Firebase Auth indisponível. Configure as variáveis EXPO_PUBLIC_* no .env.'
		)
	}
	return auth
}

export function requireDb(): Firestore {
	if (!db) {
		throw new Error(
			'Firestore indisponível. Configure as variáveis EXPO_PUBLIC_* no .env.'
		)
	}
	return db
}
