import { ReviewEntity } from '@/entities/review.entity'
import { LikeDTO } from '@/dtos/like.dtos/like.dto'
import { CreateReviewDTO } from '@/dtos/review.dto'

export interface ReviewService {
	create(data: CreateReviewDTO): Promise<void>
	getAll(): Promise<ReviewEntity[]>
	getByID(id: string): Promise<ReviewEntity | undefined>
	getByName(name: string): Promise<ReviewEntity[]>
	getByUser(userID: string): Promise<ReviewEntity[]>
	createLike(params: LikeDTO): Promise<void>
	deleteLike(params: LikeDTO): Promise<void>
}
