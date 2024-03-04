import { useQueries } from '@tanstack/react-query'

import { makeMovieService } from '@/services/impl/movie.service'
import { makeUserService } from '@/services/impl/user.service'

export interface UseGetReviewParams {
	userID: string
	movieName: string
}

const userService = makeUserService()
const movieService = makeMovieService()

export function useGetReview(params: UseGetReviewParams) {
	const { userID, movieName } = params
	return useQueries({
		queries: [
			{
				queryFn: () => userService.getByID(userID),
				queryKey: ['profile.review', userID],
			},
			{
				queryFn: () => movieService.getByName(movieName),
				queryKey: ['movie.review', movieName],
			},
		],
	})
}
