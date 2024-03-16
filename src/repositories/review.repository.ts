import { ReviewEntity } from '@/entities/review.entity'

export interface ReviewRepository {
	getAll(): Promise<ReviewEntity[]>
	getByID(id: string): Promise<ReviewEntity | undefined>
	addLike(id: string, document: string): Promise<void>
	deleteLike(id: string, document: string): Promise<void>
}
