import { CreateLikeDTO } from '@/dtos/like.dtos/create-like.dto'
import { LikeEntity } from '@/entities/like.entity'
import { LikeDTO } from '@/dtos/like.dtos/like.dto'

export interface LikeService {
	create(params: CreateLikeDTO): Promise<LikeEntity | undefined>
	delete(params: LikeDTO): Promise<LikeEntity | undefined>
}
