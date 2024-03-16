import { CreateLikeDTO } from '@/dtos/like.dtos/create-like.dto'
import { GetLikeDTO } from '@/dtos/like.dtos/get-like.dto'
import { LikeEntity } from '@/entities/like.entity'

export interface LikeRepository {
	create(params: CreateLikeDTO): Promise<LikeEntity>
	delete(id: string): Promise<void>
	getAllByDocumentID(id: string): Promise<LikeEntity[]>
	get(params: GetLikeDTO): Promise<LikeEntity | undefined>
}
