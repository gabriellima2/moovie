import { ReviewEntity } from '@/entities/review.entity'
import { LikeDTO } from '@/dtos/like.dtos/like.dto'

import type { CreateReviewFields } from '@/schemas/review.schema'

export interface ReviewService {
	create(
		userId: string,
		movieName: string,
		values: CreateReviewFields
	): Promise<void>
	getAll(): Promise<ReviewEntity[]>
	getByID(id: string): Promise<ReviewEntity | undefined>
	getByName(name: string): Promise<ReviewEntity[]>
	getByUser(userID: string): Promise<ReviewEntity[]>
	createLike(params: LikeDTO): Promise<void>
	deleteLike(params: LikeDTO): Promise<void>
}
