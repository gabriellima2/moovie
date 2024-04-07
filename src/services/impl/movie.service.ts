import { MovieService } from '../movie.service'
import { HttpAdapter } from '@/adapters/http.adapter'

import { makeHttpAdapter } from '@/adapters/impl/http.adapter'

import { MovieNotFoundException } from '@/exceptions/movie-not-found.exception'
import { MovieEntity } from '@/entities/movie.entity'

class MovieServiceImpl implements MovieService {
	constructor(
		private readonly http: HttpAdapter,
		private readonly baseUrl: string
	) {}
	async getByName(name: string): Promise<MovieEntity> {
		const response = await this.http.get<MovieEntity & { Error: string }>(
			`${this.baseUrl}&t=${name}`
		)
		if (response && response.Error) throw new MovieNotFoundException()
		return response as MovieEntity
	}
}

export const makeMovieService = () =>
	new MovieServiceImpl(
		makeHttpAdapter(),
		`https://www.omdbapi.com/?apikey=${process.env.EXPO_PUBLIC_MOVIE_API_KEY}&flot=full`
	)
