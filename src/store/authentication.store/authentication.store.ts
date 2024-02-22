import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInAnonymously,
	sendEmailVerification,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from 'firebase/auth'
import { create } from 'zustand'

import { auth } from '@/lib/firebase'

import { AuthenticationStoreProperties } from './@types/authentication.store.properties'
import { SignUpDTO } from '@/dtos/sign-up.dto'
import { SignInDTO } from '@/dtos/sign-in.dto'

export const useAuthenticationStore = create<AuthenticationStoreProperties>(
	(set, get) => ({
		user: null,
		authStateHasBeenChecked: false,
		signUp: async (credentials: SignUpDTO) => {
			await createUserWithEmailAndPassword(
				auth,
				credentials.email,
				credentials.password
			)
		},
		signIn: async (credentials: SignInDTO) => {
			await signInWithEmailAndPassword(
				auth,
				credentials.email,
				credentials.password
			)
		},
		anonymously: async () => {
			await signInAnonymously(auth)
		},
		sendEmailVerification: async () => {
			const { user } = get()
			if (!user) throw new Error('No user currently authenticated')
			await sendEmailVerification(user)
		},
		sendPasswordReset: async (email: string) => {
			await sendPasswordResetEmail(auth, email)
		},
		checkAuthState: () => {
			return onAuthStateChanged(auth, (user) => {
				set((state) => ({ ...state, user, authStateHasBeenChecked: true }))
			})
		},
	})
)
