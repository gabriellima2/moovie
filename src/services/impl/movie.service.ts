import { MovieService } from '../movie.service'
import { HttpAdapter } from '@/adapters/http.adapter'

import { makeHttpAdapter } from '@/adapters/impl/http.adapter'

import { MovieEntity } from '@/entities/movie.entity'

class MovieServiceImpl implements MovieService {
	constructor(
		private readonly http: HttpAdapter,
		private readonly baseUrl: string
	) {}
	async getByName(name: string): Promise<MovieEntity> {
		return await this.http.get<MovieEntity>(`${this.baseUrl}&t=${name}`)
	}
}

export const makeMovieService = () =>
	new MovieServiceImpl(
		makeHttpAdapter(),
		`https://www.omdbapi.com/?apikey=${process.env.EXPO_PUBLIC_MOVIE_API_KEY}&flot=full`
	)
