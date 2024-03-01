import { useQuery } from '@tanstack/react-query'

import { makeMovieService } from '@/services/impl/movie.service'
import { MovieEntity } from '@/entities/movie.entity'

const movieService = makeMovieService()

export function useGetMovieByName(name: string) {
	return useQuery<MovieEntity>({
		queryFn: () => movieService.getByName(name),
		queryKey: ['movie'],
	})
}
