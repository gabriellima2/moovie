import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { useForm } from '@/hooks/use-form'

import { authenticationSchema } from '@/schemas/authentication.schema'
import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

import { SignUpDTO } from '@/dtos/sign-up.dto'

const toast = makeToastAdapter()

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
	const { signUp, sendEmailVerification } = useAuthenticationStore()

	async function handleCreateAccount(credentials: SignUpDTO) {
		try {
			await signUp(credentials)
			toast.show({
				type: 'success',
				title: 'Account successfully created',
				description: 'Enter the email you entered to verify it',
			})
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

	return {
		errors,
		isSubmitting,
		setValue,
		onSubmit: handleSubmit(handleCreateAccount),
	}
}
