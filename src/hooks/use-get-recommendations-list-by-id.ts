import { useQuery } from '@tanstack/react-query'

import { makeRecommendationsListService } from '@/services/impl/recommendations-list.service'
import { makeReviewService } from '@/services/impl/review.service'
import { makeMovieService } from '@/services/impl/movie.service'
import { makeUserService } from '@/services/impl/user.service'

import { QUERY_KEYS } from '@/constants/keys'

import type { GetRecommendationListDTO } from '@/dtos/recommendation-list.dto'

const services = {
	user: makeUserService(),
	movie: makeMovieService(),
	review: makeReviewService(),
	recommendationList: makeRecommendationsListService(),
}

export function useGetRecommendationsListById(id: string) {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_RECOMMENDATIONS_LIST_PREVIEW],
		queryFn: async () => {
			const recommendationsList = await services.recommendationList.getByID(id)
			if (recommendationsList) {
				const user = await services.user.getByID(recommendationsList.user_id)
				const movies = await Promise.all(
					recommendationsList.movies_name.map((movieName) =>
						services.movie.getByName(movieName)
					)
				)

				const a: GetRecommendationListDTO = {
					...recommendationsList,
					user,
					movies,
				}
				return a
			}
		},
		throwOnError: true,
	})
}
