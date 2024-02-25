import { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from '@/hooks/use-form'
import { nameSchema } from '@/schemas/user.schema'

export type IntroductionFormFields = {
	name: string
}

export function useIntroductionForm() {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IntroductionFormFields>({
		resolver: zodResolver(z.object({ name: nameSchema })),
	})

	function handleSaveUserInformations(credentials: IntroductionFormFields) {
		console.log(credentials.name)
	}

	useEffect(() => {
		register('name')
	}, [register])

	return {
		errors,
		isSubmitting,
		setValue,
		onSubmit: handleSubmit(handleSaveUserInformations),
	}
}
