import { onAuthStateChanged } from 'firebase/auth'
import { create } from 'zustand'

import { auth } from '@/lib/firebase'
import { AuthenticationStoreProperties } from './@types/authentication.store.properties'

export const useAuthenticationStore = create<AuthenticationStoreProperties>(
	(set) => ({
		user: null,
		authStateHasBeenChecked: false,
		checkAuthState: () => {
			return onAuthStateChanged(auth, (user) => {
				set((state) => ({ ...state, user, authStateHasBeenChecked: true }))
			})
		},
	})
)
