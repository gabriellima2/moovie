import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { useForm } from '@/hooks/use-form'

import { makeToastAdapter } from '@/adapters/impl/toast.adapter'
import { emailSchema } from '@/schemas/user.schema'

export type UseResetPasswordMailerFormFields = {
	email: string
}

const toast = makeToastAdapter()

export function useResetPasswordMailerForm() {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<UseResetPasswordMailerFormFields>({
		resolver: zodResolver(z.object({ email: emailSchema })),
	})
	const { sendPasswordReset } = useAuthenticationStore()
	const { replace } = useRouter()

	async function handleResetPassword(
		credentials: UseResetPasswordMailerFormFields
	) {
		try {
			await sendPasswordReset(credentials.email)
			replace('/reset-password-email-has-been-sent')
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
	}, [register])

	return {
		errors,
		isSubmitting,
		setValue,
		onSubmit: handleSubmit(handleResetPassword),
	}
}
