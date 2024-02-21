import { useEffect } from 'react'
import { useForm } from '@/hooks/use-form'

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
	} = useForm<UseCreateAccountFormFields>()

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
