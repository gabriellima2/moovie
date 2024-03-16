import { ReviewEntity } from '@/entities/review.entity'

export interface ReviewService {
	getAll(): Promise<ReviewEntity[]>
	getByID(id: string): Promise<ReviewEntity | undefined>
}
