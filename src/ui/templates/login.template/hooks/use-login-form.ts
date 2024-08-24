import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { useForm } from '@/hooks/use-form'

import { authenticationSchema } from '@/schemas/authentication.schema'
import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

import { SignInDTO } from '@/dtos/sign-in.dto'
import { ERROR_MESSAGES } from '@/constants/error-messages'

const toast = makeToastAdapter()

export function useLoginForm() {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<SignInDTO>({
		resolver: zodResolver(authenticationSchema),
	})
	const { signIn } = useAuthenticationStore()
	const { replace } = useRouter()

	async function handleLogin(credentials: SignInDTO) {
		try {
			await signIn(credentials)
			replace('/(tabs)/')
		} catch (err) {
			toast.show({
				type: 'error',
				title: ERROR_MESSAGES.UNEXPECTED,
				description: (err as Error).message,
			})
		}
	}

	useEffect(() => {
		register('email')
		register('password')
	}, [register])

	return {
		errors,
		isSubmitting,
		setValue,
		onSubmit: handleSubmit(handleLogin),
	}
}
