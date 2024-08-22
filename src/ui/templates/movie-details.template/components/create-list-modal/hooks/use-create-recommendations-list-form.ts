import { useEffect, useMemo } from 'react'
import { useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import { useMovieDetailsContext } from '../../../contexts/movie-details.context'
import { useCreateRecommendationsList } from './use-create-recommendations-list'
import { useForm } from '@/hooks/use-form'

import { makeToastAdapter } from '@/adapters/impl/toast.adapter'
import { getDefaultValues } from '../utils/get-default-values'

import {
	createRecommendationsListSchema,
	type CreateRecommendationsListFields,
} from '@/schemas/recommendations-list.schema'

const toast = makeToastAdapter()

export function useCreateRecommendationsListForm() {
	const defaultValues = useMemo(() => getDefaultValues(), [])
	const {
		register,
		setValue,
		handleSubmit,
		reset,
		control,
		formState: { isSubmitting, errors },
	} = useForm<CreateRecommendationsListFields>({
		defaultValues,
		resolver: zodResolver(createRecommendationsListSchema),
	})
	const { closeActionsMenu, closeCreateListModal } = useMovieDetailsContext()
	const { handleCreate } = useCreateRecommendationsList()
	const queryClient = useQueryClient()
	const values = useWatch({ control })

	async function onSubmit(values: CreateRecommendationsListFields) {
		try {
			await handleCreate(values)
			toast.show({
				type: 'success',
				title: 'List successfully created',
			})
			reset(defaultValues)
			closeCreateListModal()
			closeActionsMenu()
			queryClient.invalidateQueries({
				queryKey: ['recommendations-list-of-user'],
			})
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
		register('title')
	}, [register])

	return {
		values: {
			description: values.description || defaultValues.description,
			title: values.title || defaultValues.title,
		},
		errors,
		isSubmitting,
		setValue,
		onSubmit: handleSubmit(onSubmit),
	}
}
