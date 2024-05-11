import { ReviewService } from '../review.service'

import { makeReviewRepository } from '@/repositories/impl/review.repository'
import { makeLikeService } from './like.service'

import { ReviewRepository } from '@/repositories/review.repository'
import { ReviewEntity } from '@/entities/review.entity'

import { LikeDTO } from '@/dtos/like.dtos/like.dto'
import { LikeType } from '@/entities/like.entity'
import { LikeService } from '../like.service'

class ReviewServiceImpl implements ReviewService {
	constructor(
		private readonly repository: ReviewRepository,
		private readonly likeService: LikeService
	) {}
	async getAll(): Promise<ReviewEntity[]> {
		return await this.repository.getAll()
	}
	async getByID(id: string): Promise<ReviewEntity | undefined> {
		return await this.repository.getByID(id)
	}
	async getByName(name: string): Promise<ReviewEntity[]> {
		const reviews = await this.repository.getByName(name)
		if (!reviews) return []
		return reviews
	}
	async getByUser(userID: string): Promise<ReviewEntity[]> {
		const reviews = await this.repository.getByUser(userID)
		if (!reviews) return []
		return reviews
	}
	async createLike(params: LikeDTO): Promise<void> {
		const { user_id, document_id } = params
		const createdLike = await this.likeService.create({
			type: LikeType.Review,
			user_id,
			document_id,
		})
		if (!createdLike) return
		await this.repository.addLike(createdLike.id, document_id)
	}
	async deleteLike(params: LikeDTO): Promise<void> {
		const like = await this.likeService.delete(params)
		if (!like) return
		await this.repository.deleteLike(like.id, params.document_id)
	}
}

export const makeReviewService = () =>
	new ReviewServiceImpl(makeReviewRepository(), makeLikeService())
