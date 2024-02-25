import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { updateProfile } from 'firebase/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { useForm } from '@/hooks/use-form'

import { nameSchema } from '@/schemas/user.schema'
import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

export type IntroductionFormFields = {
	username: string
}

const toast = makeToastAdapter()

export function useIntroductionForm() {
	const { user } = useAuthenticationStore()
	const { replace } = useRouter()
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
		if (!user) return replace('/login')
		try {
			await updateProfile(user, {
				displayName: credentials.username.trim().toLowerCase(),
			})
			toast.show({
				type: 'success',
				title: 'Username was saved successfully',
				description:
					'The name has been saved successfully. You can change it at any time',
			})
		} catch (err) {
			toast.show({
				type: 'error',
				title: 'An error has occurred',
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
