import { useEffect, useMemo } from 'react'
import { useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from '@/hooks/use-form'

import { makeToastAdapter } from '@/adapters/impl/toast.adapter'
import { getDefaultValues } from '../utils/get-default-values'

import {
	createReviewSchema,
	type CreateReviewFields,
} from '@/schemas/review.schema'

const toast = makeToastAdapter()

export function useCreateReviewForm() {
	const defaultValues = useMemo(() => getDefaultValues(), [])
	const {
		register,
		setValue,
		handleSubmit,
		reset,
		control,
		formState: { isSubmitting, errors },
	} = useForm<CreateReviewFields>({
		defaultValues,
		resolver: zodResolver(createReviewSchema),
	})
	const values = useWatch({ control })

	async function handleCreateReview(credentials: CreateReviewFields) {
		try {
			console.log(credentials)
			toast.show({
				type: 'success',
				title: 'Review successfully created',
			})
			reset(defaultValues)
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
		register('rating')
	}, [register])

	return {
		values: {
			description: values.description || defaultValues.description,
			rating: values.rating || defaultValues.rating,
		},
		errors,
		isSubmitting,
		setValue,
		onSubmit: handleSubmit(handleCreateReview),
	}
}
