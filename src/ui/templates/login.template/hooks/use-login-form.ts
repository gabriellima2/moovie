import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'

import { authenticationSchema } from '@/schemas/authentication.schema'
import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

import { SignInDTO } from '@/dtos/sign-in.dto'

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
				title: 'An error has occurred',
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
