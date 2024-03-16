import { ReviewEntity } from '@/entities/review.entity'

export interface ReviewRepository {
	getAll(): Promise<ReviewEntity[]>
	getByID(id: string): Promise<ReviewEntity | undefined>
}
