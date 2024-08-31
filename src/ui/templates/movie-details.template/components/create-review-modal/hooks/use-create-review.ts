import { useMovieDetailsContext } from '../../../contexts/movie-details.context/hooks/use-movie-details-context'
import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'

import { makeReviewService } from '@/services/impl/review.service'
import { CreateReviewMapper } from '@/mappers/create-review.mapper'

import { UserNotAuthenticatedException } from '@/exceptions/user-not-authenticated.exception'
import type { CreateReviewFields } from '@/schemas/review.schema'

const reviewService = makeReviewService()

export function useCreateReview() {
	const user = useAuthenticationStore((state) => state.user)
	const { movieName } = useMovieDetailsContext()

	async function handleCreate(values: CreateReviewFields) {
		if (!user) throw new UserNotAuthenticatedException()
		await reviewService.create(
			CreateReviewMapper.toService(user.uid, movieName, values)
		)
	}

	return {
		handleCreate,
	}
}
