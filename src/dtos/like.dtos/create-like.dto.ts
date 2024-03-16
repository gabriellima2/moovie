import { LikeType } from '@/entities/like.entity'

export interface CreateLikeDTO {
	document_id: string
	user_id: string
	type: LikeType
}
