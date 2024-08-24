import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInAnonymously,
	sendEmailVerification,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	updateProfile,
	signOut,
} from 'firebase/auth'
import { create } from 'zustand'

import { makeUserService } from '@/services/impl/user.service'
import { auth } from '@/lib/firebase'

import { UserNotAuthenticatedException } from '@/exceptions/user-not-authenticated.exception'

import type { AuthenticationStoreProperties } from './@types/authentication.store.properties'
import type { UpdateProfileDTO } from '@/dtos/update-profile.dto'
import type { SignUpDTO } from '@/dtos/sign-up.dto'
import type { SignInDTO } from '@/dtos/sign-in.dto'

const userService = makeUserService()

export const useAuthenticationStore = create<AuthenticationStoreProperties>(
	(set, get) => ({
		user: null,
		authStateHasBeenChecked: false,
		signUp: async (credentials: SignUpDTO) => {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				credentials.email,
				credentials.password
			)
			set((state) => ({ ...state, user, authStateHasBeenChecked: true }))
		},
		signIn: async (credentials: SignInDTO) => {
			const { user } = await signInWithEmailAndPassword(
				auth,
				credentials.email,
				credentials.password
			)
			set((state) => ({ ...state, user, authStateHasBeenChecked: true }))
		},
		logout: async () => {
			await signOut(auth)
			set((state) => ({ ...state, user: null, authStateHasBeenChecked: true }))
		},
		anonymously: async () => {
			const { user } = await signInAnonymously(auth)
			set((state) => ({ ...state, user, authStateHasBeenChecked: true }))
		},
		sendEmailVerification: async () => {
			const { user } = get()
			if (!user) throw new UserNotAuthenticatedException()
			await sendEmailVerification(user)
		},
		sendPasswordReset: async (email: string) => {
			await sendPasswordResetEmail(auth, email)
		},
		updateProfile: async (params: UpdateProfileDTO) => {
			const { user } = get()
			if (!user) throw new UserNotAuthenticatedException()
			await updateProfile(user, { displayName: params.name })
			await userService.create({ id: user.uid, name: params.name })
			await user.reload()
		},
		checkAuthState: () => {
			return onAuthStateChanged(auth, (user) => {
				set((state) => ({ ...state, user, authStateHasBeenChecked: true }))
			})
		},
	})
)
