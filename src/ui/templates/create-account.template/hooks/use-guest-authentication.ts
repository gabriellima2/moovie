import { useEffect, useState } from 'react'
import { Unsubscribe } from 'firebase/auth'
import { useRouter } from 'expo-router'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

let unsubscribe: Unsubscribe
const toast = makeToastAdapter()

export function useGuestAuthentication() {
	const { replace } = useRouter()
	const [isAuthenticating, setIsAuthenticating] = useState(false)
	const { checkAuthState, anonymously } = useAuthenticationStore()

	async function handleGuestAuthentication() {
		setIsAuthenticating(true)
		try {
			await anonymously()
			unsubscribe = checkAuthState()
			replace('/home')
		} catch (err) {
			toast.show({
				type: 'error',
				title: 'An error has occurred',
				description: (err as Error).message,
			})
		} finally {
			setIsAuthenticating(false)
		}
	}

	useEffect(() => {
		return () => unsubscribe && unsubscribe()
	}, [])

	return {
		isAuthenticating,
		handleGuestAuthentication,
	}
}
