import { useEffect, useMemo } from 'react'
import { useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import { useMovieDetailsContext } from '../../../contexts/movie-details.context'
import { useCreateRecommendationsList } from './use-create-recommendations-list'
import { useForm } from '@/hooks/use-form'

import { makeToastAdapter } from '@/adapters/impl/toast.adapter'
import { getDefaultValues } from '../utils/get-default-values'

import { ERROR_MESSAGES } from '@/constants/error-messages'
import { FEEDBACK } from '@/constants/feedback'
import { QUERY_KEYS } from '@/constants/keys'

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
				title: FEEDBACK.CREATE_RECOMMENDATIONS_LIST.SUCCESS.TITLE,
			})
			reset(defaultValues)
			closeCreateListModal()
			closeActionsMenu()
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_USER_RECOMMENDATIONS_LIST],
			})
		} catch (err) {
			const _error = (err as Error)?.message || ERROR_MESSAGES.UNEXPECTED
			toast.show({
				type: 'error',
				title: _error,
				description: _error,
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
