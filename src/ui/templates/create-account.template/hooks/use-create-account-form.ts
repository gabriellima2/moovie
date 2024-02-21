import { useEffect } from 'react'
import { Unsubscribe } from 'firebase/auth'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { useForm } from '@/hooks/use-form'

import { authenticationSchema } from '@/schemas/authentication.schema'
import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

import { SignUpDTO } from '@/dtos/sign-up.dto'

const toast = makeToastAdapter()
let unsubscribe: Unsubscribe

export function useCreateAccountForm() {
	const { signUp, checkAuthState } = useAuthenticationStore()
	const {
		register,
		setValue,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<SignUpDTO>({
		resolver: zodResolver(authenticationSchema),
	})

	async function handleCreateAccount(credentials: SignUpDTO) {
		try {
			await signUp(credentials)
			toast.show({
				type: 'success',
				title: 'Account successfully created',
				description:
					'Your account has been created successfully, enter the email provided to activate it',
			})
			unsubscribe = checkAuthState()
			reset({})
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
		onSubmit: handleSubmit(handleCreateAccount),
	}
}
