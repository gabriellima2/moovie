import { CreateReviewDTO } from '@/dtos/review.dto'
import { ReviewEntity } from '@/entities/review.entity'

export interface ReviewRepository {
	create(data: CreateReviewDTO): Promise<void>
	getAll(): Promise<ReviewEntity[]>
	getByID(id: string): Promise<ReviewEntity | undefined>
	getByName(name: string): Promise<ReviewEntity[] | undefined>
	getByUser(userID: string): Promise<ReviewEntity[] | undefined>
	addLike(id: string, document: string): Promise<void>
	deleteLike(id: string, document: string): Promise<void>
}
