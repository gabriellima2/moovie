import { ReviewEntity } from '@/entities/review.entity'

export interface ReviewRepository {
	getAll(): Promise<ReviewEntity[]>
}
