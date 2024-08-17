import { useMovieDetailsContext } from '../../../contexts/movie-details.context'
import { useBoolean } from '@/hooks/use-boolean'

import { makeRecommendationsListService } from '@/services/impl/recommendations-list.service'
import { makeToastAdapter } from '@/adapters/impl/toast.adapter'

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
				title: 'Movie successfully added to the list',
			})
			closeAddToListModal()
			closeActionsMenu()
		} catch (err) {
			toast.show({
				type: 'error',
				title: (err as Error)?.message || 'An error has occurred',
				description: (err as Error).message,
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return { handleAddMovieToList, isSubmitting }
}
