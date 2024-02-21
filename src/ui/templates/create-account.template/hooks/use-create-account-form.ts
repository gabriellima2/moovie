import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from '@/hooks/use-form'
import { authenticationSchema } from '@/schemas/authentication.schema'

export type UseCreateAccountFormFields = {
	email: string
	password: string
}

export function useCreateAccountForm() {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<UseCreateAccountFormFields>({
		resolver: zodResolver(authenticationSchema),
	})

	function handleCreateAccount(credentials: UseCreateAccountFormFields) {
		console.log(credentials)
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
