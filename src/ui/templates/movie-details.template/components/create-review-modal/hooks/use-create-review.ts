import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { useMovieDetailsContext } from '../../../contexts/movie-details.context'

import { makeReviewService } from '@/services/impl/review.service'

import type { CreateReviewFields } from '@/schemas/review.schema'

const reviewService = makeReviewService()

export function useCreateReview() {
	const user = useAuthenticationStore((state) => state.user)
	const { movieName } = useMovieDetailsContext()

	async function handleCreate(values: CreateReviewFields) {
		if (!user) {
			throw new Error('Error while creating review, user not authenticated')
		}
		await reviewService.create(user.uid, movieName, values)
	}

	return {
		handleCreate,
	}
}
