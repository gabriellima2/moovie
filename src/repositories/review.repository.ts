import { ReviewEntity } from '@/entities/review.entity'
import { CreateReviewFields } from '@/schemas/review.schema'

export interface ReviewRepository {
	create(
		userId: string,
		movieName: string,
		values: CreateReviewFields
	): Promise<void>
	getAll(): Promise<ReviewEntity[]>
	getByID(id: string): Promise<ReviewEntity | undefined>
	getByName(name: string): Promise<ReviewEntity[] | undefined>
	getByUser(userID: string): Promise<ReviewEntity[] | undefined>
	addLike(id: string, document: string): Promise<void>
	deleteLike(id: string, document: string): Promise<void>
}
