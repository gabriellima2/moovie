import { ReviewEntity } from '@/entities/review.entity'
import { LikeDTO } from '@/dtos/like.dtos/like.dto'

export interface ReviewService {
	getAll(): Promise<ReviewEntity[]>
	getByID(id: string): Promise<ReviewEntity | undefined>
	getByName(name: string): Promise<ReviewEntity[]>
	createLike(params: LikeDTO): Promise<void>
	deleteLike(params: LikeDTO): Promise<void>
}
