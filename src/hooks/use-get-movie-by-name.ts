import { useQuery } from '@tanstack/react-query'

import { makeMovieService } from '@/services/impl/movie.service'
import { MovieEntity } from '@/entities/movie.entity'

import { QUERY_KEYS } from '@/constants/keys'

const movieService = makeMovieService()

export function useGetMovieByName(name: string) {
	return useQuery<MovieEntity>({
		queryFn: () => movieService.getByName(name),
		queryKey: QUERY_KEYS.GET_MOVIE_BY_NAME(name),
		throwOnError: true,
	})
}
