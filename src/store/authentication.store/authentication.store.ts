import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInAnonymously,
} from 'firebase/auth'
import { create } from 'zustand'

import { auth } from '@/lib/firebase'

import { AuthenticationStoreProperties } from './@types/authentication.store.properties'
import { SignUpDTO } from '@/dtos/sign-up.dto'

export const useAuthenticationStore = create<AuthenticationStoreProperties>(
	(set) => ({
		user: null,
		authStateHasBeenChecked: false,
		signUp: async (credentials: SignUpDTO) => {
			await createUserWithEmailAndPassword(
				auth,
				credentials.email,
				credentials.password
			)
		},
		anonymously: async () => {
			await signInAnonymously(auth)
		},
		checkAuthState: () => {
			return onAuthStateChanged(auth, (user) => {
				set((state) => ({ ...state, user, authStateHasBeenChecked: true }))
			})
		},
	})
)
