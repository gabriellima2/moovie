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
						const userIds = reviews.map((review) => review.user_id)
						const movieNames = reviews.map((review) => review.movie_name)

						const users = await Promise.all(
							userIds.map((id) => services.user.getByID(id))
						)
						const movies = await Promise.all(
							movieNames.map((name) => services.movie.getByName(name))
						)

						const data: ReviewDTO[] = reviews.map((review, index) => {
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
							const { user_id, movie_name, ...rest } = review
							return {
								user: { ...users[index] },
								movie: { ...movies[index] },
								...rest,
							}
						})
						return data
					}
				},
				throwOnError: true,
			},
			{
				queryKey: ['recommendations_list_preview'],
				queryFn: async () => {
					const recommendations = await services.recommendationList.getAll()
					if (recommendations && recommendations.length) {
						const userIds = recommendations.map((review) => review.user_id)
						const movieNames = recommendations.map(
							(review) => review.movies_name[0]
						)

						const users = await Promise.all(
							userIds.map((id) => services.user.getByID(id))
						)
						const movies = await Promise.all(
							movieNames.map((name) => services.movie.getByName(name))
						)

						const data: RecommendationListDTO[] = recommendations.map(
							(review, index) => {
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
								const { user_id, movies_name, ...rest } = review
								return {
									user: { ...users[index] },
									movie: { ...movies[index] },
									...rest,
								}
							}
						)
						return data
					}
				},
				throwOnError: true,
			},
		],
	})
}
