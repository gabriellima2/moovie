import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { useForm } from '@/hooks/use-form'

import { nameSchema } from '@/schemas/user.schema'
import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

import { ERROR_MESSAGES } from '@/constants/error-messages'
import { FEEDBACK } from '@/constants/feedback'

export type IntroductionFormFields = {
	username: string
}

const toast = makeToastAdapter()

export function useIntroductionForm() {
	const { updateProfile } = useAuthenticationStore()
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IntroductionFormFields>({
		resolver: zodResolver(z.object({ username: nameSchema })),
	})

	async function handleSaveUserInformations(
		credentials: IntroductionFormFields
	) {
		try {
			await updateProfile({ name: credentials.username.trim().toLowerCase() })
			toast.show({
				type: 'success',
				title: FEEDBACK.DEFINE_USERNAME.SUCCESS.TITLE,
				description: FEEDBACK.DEFINE_USERNAME.SUCCESS.DESCRIPTION,
			})
		} catch (err) {
			toast.show({
				type: 'error',
				title: ERROR_MESSAGES.UNEXPECTED,
				description: (err as Error).message,
			})
		}
	}

	async function handleSaveEmptyUserInformations() {
		await handleSaveUserInformations({ username: 'Anonymous' })
	}

	useEffect(() => {
		register('username')
	}, [register])

	return {
		errors,
		isSubmitting,
		setValue,
		handleSaveEmptyUserInformations,
		onSubmit: handleSubmit(handleSaveUserInformations),
	}
}
