import { useMovieDetailsContext } from '../../../contexts/movie-details.context/hooks/use-movie-details-context'
import { useBoolean } from '@/hooks/use-boolean'

import { FEEDBACK } from '@/constants/feedback'

import { makeRecommendationsListService } from '@/services/impl/recommendations-list.service'
import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

import { ERROR_MESSAGES } from '@/constants/error-messages'

const service = makeRecommendationsListService()
const toast = makeToastAdapter()

export function useAddMovieToList(movieName: string) {
	const { value: isSubmitting, setValue: setIsSubmitting } = useBoolean(false)
	const { closeActionsMenu, closeAddToListModal } = useMovieDetailsContext()

	async function handleAddMovieToList(listIds: string[]) {
		setIsSubmitting(true)
		try {
			if (!listIds.length) return
			const promises = listIds.map((listId) =>
				service.append(listId, movieName)
			)
			await Promise.all(promises)
			toast.show({
				type: 'success',
				title: FEEDBACK.ADD_MOVIE_TO_LIST.SUCCESS.TITLE,
			})
			closeAddToListModal()
			closeActionsMenu()
		} catch (err) {
			const _error = (err as Error)?.message || ERROR_MESSAGES.UNEXPECTED
			toast.show({
				type: 'error',
				title: _error,
				description: _error,
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return { handleAddMovieToList, isSubmitting }
}
