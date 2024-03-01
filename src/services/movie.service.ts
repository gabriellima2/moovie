import { MovieEntity } from '@/entities/movie.entity'

export interface MovieService {
	getByName(name: string): Promise<MovieEntity>
}
