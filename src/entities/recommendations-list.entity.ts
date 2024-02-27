import { LikeEntity, LikeType } from './like.entity'

export interface RecommendationsListEntity {
	title: string
	description: string
	movies_id: string[]
	user_id: string
	likes: LikeEntity<LikeType.List>[]
}
