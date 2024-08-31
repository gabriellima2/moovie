import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'
import { MovieEntity } from '@/entities/movie.entity'

export interface RecommendationListDTO
	extends Omit<RecommendationsListEntity, 'user_id' | 'movies_name'> {
	movie: MovieEntity
	user: { id: string; name: string }
}

export interface GetRecommendationListDTO
	extends Omit<RecommendationsListEntity, 'user_id' | 'movies_name'> {
	movies: MovieEntity[]
	user: { id: string; name: string }
}

export interface CreateRecommendationListDTO {
	description: string | null
	title: string
	userId: string
}
