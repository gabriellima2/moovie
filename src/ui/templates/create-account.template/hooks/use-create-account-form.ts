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
	const {
		register,
		setValue,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<SignUpDTO>({
		resolver: zodResolver(authenticationSchema),
	})
	const { signUp, sendEmailVerification, checkAuthState } =
		useAuthenticationStore()

	async function handleCreateAccount(credentials: SignUpDTO) {
		try {
			await signUp(credentials)
			toast.show({
				type: 'success',
				title: 'Account successfully created',
				description: 'Enter the email you entered to verify it',
			})
			unsubscribe = checkAuthState()
			reset({})
			await sendEmailVerification()
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
