import { useQueries } from '@tanstack/react-query'

import { makeMovieService } from '@/services/impl/movie.service'
import { makeReviewService } from '@/services/impl/review.service'

import { ReviewEntity } from '@/entities/review.entity'
import { MovieEntity } from '@/entities/movie.entity'

type MovieDetails = MovieEntity & {
	reviews: ReviewEntity[]
}

const services = {
	movie: makeMovieService(),
	review: makeReviewService(),
}

export function useGetMovieDetails(name: string) {
	return useQueries({
		queries: [
			{
				queryFn: () => services.movie.getByName(name),
				queryKey: ['movie', name],
			},
			{
				queryFn: () => services.review.getByName(name),
				queryKey: ['review', name],
			},
		],
		combine: (result) => {
			const [movie, review] = result
			const isLoading = movie.isLoading && review.isLoading
			const error = movie.error || review.error
			const hasData = movie.data && review.data
			const data = hasData
				? ({ ...movie.data, reviews: review.data } as MovieDetails)
				: undefined
			return { data, error, isLoading }
		},
	})
}
