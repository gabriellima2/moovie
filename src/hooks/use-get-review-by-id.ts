import { useQuery } from '@tanstack/react-query'

import { makeReviewService } from '@/services/impl/review.service'
import { makeMovieService } from '@/services/impl/movie.service'
import { makeUserService } from '@/services/impl/user.service'
import { QUERY_KEYS } from '@/constants/keys'

const services = {
	review: makeReviewService(),
	movie: makeMovieService(),
	user: makeUserService(),
}

export function useGetReviewByID(id?: string | null) {
	return useQuery({
		queryFn: async () => {
			const review = await services.review.getByID(id!)
			if (review) {
				const movie = await services.movie.getByName(review.movie_name)
				const user = await services.user.getByID(review.user_id)
				return { ...review, movie_image: movie.Poster, user_name: user.name }
			}
		},
		queryKey: QUERY_KEYS.GET_REVIEW_BY_ID(id || undefined),
		enabled: !!id,
		throwOnError: true,
	})
}
