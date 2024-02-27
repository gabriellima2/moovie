import { LikeEntity, LikeType } from './like.entity'

export interface ReviewEntity {
	id: string
	movie_id: string
	user_id: string
	rating: number
	description: string
	likes: LikeEntity<LikeType.Review>[]
}
