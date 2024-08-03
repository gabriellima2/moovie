import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from '@/hooks/use-form'

import { reviewSchema, type ReviewSchemaFields } from '@/schemas/review.schema'
import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

const toast = makeToastAdapter()

export function useCreateReviewForm() {
	const {
		register,
		setValue,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<ReviewSchemaFields>({
		resolver: zodResolver(reviewSchema),
	})

	async function handleCreateReview(credentials: ReviewSchemaFields) {
		try {
			console.log(credentials)
			toast.show({
				type: 'success',
				title: 'Review successfully created',
			})
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
		register('description')
	}, [register])

	return {
		errors,
		isSubmitting,
		setValue,
		onSubmit: handleSubmit(handleCreateReview),
	}
}
