import { CreateLikeDTO } from '@/dtos/like.dtos/create-like.dto'
import { GetLikeDTO } from '@/dtos/like.dtos/get-like.dto'
import { LikeDTO } from '@/dtos/like.dtos/like.dto'

import { LikeEntity } from '@/entities/like.entity'

export interface LikeService {
	create(params: CreateLikeDTO): Promise<LikeEntity | undefined>
	delete(params: LikeDTO): Promise<LikeEntity | undefined>
	get(params: GetLikeDTO): Promise<LikeEntity | null>
}
