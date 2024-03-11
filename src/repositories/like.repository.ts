import { CreateLikeDTO } from '@/dtos/create-like.dto'
import { LikeEntity } from '@/entities/like.entity'

export interface LikeRepository {
	create(params: CreateLikeDTO): Promise<LikeEntity>
	delete(id: string): Promise<void>
}
