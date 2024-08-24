import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { useForm } from '@/hooks/use-form'

import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

import { authenticationSchema } from '@/schemas/authentication.schema'
import { FEEDBACK } from '@/constants/feedback'

import { ERROR_MESSAGES } from '@/constants/error-messages'
import type { SignUpDTO } from '@/dtos/sign-up.dto'

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
				title: FEEDBACK.CREATE_ACCOUNT.SUCCESS.TITLE,
				description: FEEDBACK.CREATE_ACCOUNT.SUCCESS.DESCRIPTION,
			})
			reset({})
			await sendEmailVerification()
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
		onSubmit: handleSubmit(handleCreateAccount),
	}
}
