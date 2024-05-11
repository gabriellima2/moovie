import { ReviewEntity } from '@/entities/review.entity'
import { MovieEntity } from '@/entities/movie.entity'

export interface ReviewDTO
	extends Omit<ReviewEntity, 'user_id' | 'movie_name'> {
	movie: MovieEntity
	user: { id: string; name: string }
}
