import { ReviewService } from '../review.service'

import { makeReviewRepository } from '@/repositories/impl/review.repository'

import { ReviewRepository } from '@/repositories/review.repository'
import { ReviewEntity } from '@/entities/review.entity'

class ReviewServiceImpl implements ReviewService {
	constructor(private readonly repository: ReviewRepository) {}
	async getAll(): Promise<ReviewEntity[]> {
		return await this.repository.getAll()
	}
	async getByID(id: string): Promise<ReviewEntity | undefined> {
		return await this.repository.getByID(id)
	}
}

export const makeReviewService = () =>
	new ReviewServiceImpl(makeReviewRepository())
