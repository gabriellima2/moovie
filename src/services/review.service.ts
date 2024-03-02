import { ReviewEntity } from '@/entities/review.entity'

export interface ReviewService {
	getAll(): Promise<ReviewEntity[]>
}
