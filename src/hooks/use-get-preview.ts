import { useQueries } from '@tanstack/react-query'

import { makeRecommendationsListService } from '@/services/impl/recommendations-list.service'
import { makeReviewService } from '@/services/impl/review.service'
import { makeMovieService } from '@/services/impl/movie.service'
import { makeUserService } from '@/services/impl/user.service'

import type { RecommendationListDTO } from '@/dtos/recommendation-list.dto'
import type { ReviewDTO } from '@/dtos/review.dto'

const services = {
	user: makeUserService(),
	movie: makeMovieService(),
	review: makeReviewService(),
	recommendationList: makeRecommendationsListService(),
}

export function useGetPreview() {
	return useQueries({
		queries: [
			{
				queryKey: ['review_preview'],
				queryFn: async () => {
					const reviews = await services.review.getAll()
					if (reviews && reviews.length) {
						const data: ReviewDTO[] = await Promise.all(
							reviews.map(async (review) => {
								const { user_id, movie_name, ...rest } = review
								const user = services.user.getByID(user_id)
								const movie = services.movie.getByName(movie_name)
								const response = await Promise.all([user, movie])
								return {
									user: { ...response[0] },
									movie: { ...response[1] },
									...rest,
								}
							})
						)
						return data
					}
				},
			},
			{
				queryKey: ['recommendations_list_preview'],
				queryFn: async () => {
					const recommendations = await services.recommendationList.getAll()
					if (recommendations && recommendations.length) {
						const data: RecommendationListDTO[] = await Promise.all(
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
					}
				},
			},
		],
	})
}
