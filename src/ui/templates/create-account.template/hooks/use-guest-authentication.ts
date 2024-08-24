import { useState } from 'react'
import { useRouter } from 'expo-router'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

import { ERROR_MESSAGES } from '@/constants/error-messages'

const toast = makeToastAdapter()

export function useGuestAuthentication() {
	const { replace } = useRouter()
	const [isAuthenticating, setIsAuthenticating] = useState(false)
	const { anonymously } = useAuthenticationStore()

	async function handleGuestAuthentication() {
		setIsAuthenticating(true)
		try {
			await anonymously()
			replace('/(tabs)/')
		} catch (err) {
			toast.show({
				type: 'error',
				title: ERROR_MESSAGES.UNEXPECTED,
				description: (err as Error).message,
			})
		} finally {
			setIsAuthenticating(false)
		}
	}

	return {
		isAuthenticating,
		handleGuestAuthentication,
	}
}
