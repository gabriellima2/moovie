import { useQueries } from '@tanstack/react-query'

import { makeRecommendationsListService } from '@/services/impl/recommendations-list.service'
import { makeReviewService } from '@/services/impl/review.service'
import { makeMovieService } from '@/services/impl/movie.service'
import { makeUserService } from '@/services/impl/user.service'

import type { RecommendationsListDTO } from '@/dtos/recommendations-list.dto'

const reviewService = makeReviewService()
const recommendationsListService = makeRecommendationsListService()

const services = {
	user: makeUserService(),
	movie: makeMovieService(),
}

export function useGetPreview() {
	return useQueries({
		queries: [
			{
				queryKey: ['review_preview'],
				queryFn: () => reviewService.getAll(),
			},
			{
				queryKey: ['recommendations_list_preview'],
				queryFn: async () => {
					const recommendations = await recommendationsListService.getAll()
					const data: RecommendationsListDTO[] = await Promise.all(
						recommendations.map(async (recommendation) => {
							const { user_id, movies_name, ...rest } = recommendation
							const user = services.user.getByID(user_id)
							const movie = services.movie.getByName(movies_name[0])
							const response = await Promise.all([user, movie])
							return {
								user: { ...response[0] },
								movie: { ...response[1] },
								...rest,
							}
						})
					)
					return data
				},
			},
		],
	})
}
