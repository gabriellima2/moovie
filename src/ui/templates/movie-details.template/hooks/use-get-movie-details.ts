import { useQuery } from '@tanstack/react-query'

import { makeMovieService } from '@/services/impl/movie.service'
import { makeReviewService } from '@/services/impl/review.service'

import { ProfileEntity } from '@/entities/profile.entity'
import { ReviewEntity } from '@/entities/review.entity'
import { MovieEntity } from '@/entities/movie.entity'

import { makeUserService } from '@/services/impl/user.service'

type MovieDetails = MovieEntity & {
	reviews: (Omit<ReviewEntity, 'user_id' | 'movie_name'> & {
		user: ProfileEntity
	})[]
}

const services = {
	movie: makeMovieService(),
	review: makeReviewService(),
	user: makeUserService(),
}

export function useGetMovieDetails(name: string) {
	return useQuery<MovieDetails>({
		queryKey: ['movie-details'],
		queryFn: async () => {
			const movie = await services.movie.getByName(name)
			const reviews = await services.review.getByName(name)
			const users = await Promise.all(
				reviews.map((review) => services.user.getByID(review.user_id))
			)
			const reviewsWithUsers = reviews.map((review, index) => ({
				...review,
				user: users[index],
			}))
			return { ...movie, reviews: reviewsWithUsers }
		},
	})
}
