import { useEffect, useMemo } from 'react'
import { useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import { useMovieDetailsContext } from '../../../contexts/movie-details.context'
import { useCreateReview } from './use-create-review'
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
	const { closeCreateReviewModal } = useMovieDetailsContext()
	const { handleCreate } = useCreateReview()
	const queryClient = useQueryClient()
	const values = useWatch({ control })

	async function onSubmit(values: CreateReviewFields) {
		try {
			await handleCreate(values)
			toast.show({
				type: 'success',
				title: 'Review successfully created',
			})
			reset(defaultValues)
			closeCreateReviewModal()
			queryClient.invalidateQueries()
		} catch (err) {
			toast.show({
				type: 'error',
				title: (err as Error)?.message || 'An error has occurred',
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
		onSubmit: handleSubmit(onSubmit),
	}
}
