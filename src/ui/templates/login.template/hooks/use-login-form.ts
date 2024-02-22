import { makeToastAdapter } from '@/adapters/impl/toast.adapter'
import { SignInDTO } from '@/dtos/sign-in.dto'
import { authenticationSchema } from '@/schemas/authentication.schema'
import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { Unsubscribe } from 'firebase/auth'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const toast = makeToastAdapter()
let unsubscribe: Unsubscribe

export function useLoginForm() {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<SignInDTO>({
		resolver: zodResolver(authenticationSchema),
	})
	const { signIn, checkAuthState } = useAuthenticationStore()
	const { replace } = useRouter()

	async function handleLogin(credentials: SignInDTO) {
		try {
			await signIn(credentials)
			unsubscribe = checkAuthState()
			replace('/(tabs)/')
		} catch (err) {
			toast.show({
				type: 'error',
				title: 'An error has occurred',
				description: (err as Error).message,
			})
		}
	}

	useEffect(() => {
		register('email')
		register('password')
	}, [register])

	useEffect(() => {
		return unsubscribe && unsubscribe()
	}, [])

	return {
		errors,
		isSubmitting,
		setValue,
		onSubmit: handleSubmit(handleLogin),
	}
}
