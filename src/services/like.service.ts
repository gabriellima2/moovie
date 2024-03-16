import { CreateLikeDTO } from '@/dtos/like.dtos/create-like.dto'
import { LikeEntity } from '@/entities/like.entity'

export interface LikeService {
	create(params: CreateLikeDTO): Promise<LikeEntity>
	delete(id: string): Promise<void>
}
