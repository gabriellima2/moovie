import { RecommendationsListService } from '../recommendations-list.service'
import { LikeService } from '../like.service'

import { makeRecommendationsListRepository } from '@/repositories/impl/firebase/recommendations-list.repository'
import { makeLikeService } from './like.service'

import { RecommendationsListRepository } from '@/repositories/recommendations-list.repository'

import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'
import { LikeType } from '@/entities/like.entity'

import { CreateRecommendationListDTO } from '@/dtos/recommendation-list.dto'
import { LikeDTO } from '@/dtos/like.dtos/like.dto'

class RecommendationsListServiceImpl implements RecommendationsListService {
	constructor(
		private readonly repository: RecommendationsListRepository,
		private readonly likeService: LikeService
	) {}
	async create(data: CreateRecommendationListDTO): Promise<void> {
		return await this.repository.create(data)
	}
	async getAll(): Promise<RecommendationsListEntity[]> {
		return await this.repository.getAll()
	}
	async getByID(id: string): Promise<RecommendationsListEntity | undefined> {
		return await this.repository.getByID(id)
	}
	async getByUser(userID: string): Promise<RecommendationsListEntity[]> {
		const recommendations = await this.repository.getByUser(userID)
		if (!recommendations) return []
		return recommendations
	}
	async append(id: string, movieName: string): Promise<void> {
		return await this.repository.append(id, movieName)
	}
	async remove(id: string, movieName: string): Promise<void> {
		return await this.repository.remove(id, movieName)
	}
	async createLike(params: LikeDTO): Promise<void> {
		const { user_id, document_id } = params
		const createdLike = await this.likeService.create({
			type: LikeType.List,
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

export const makeRecommendationsListService = () =>
	new RecommendationsListServiceImpl(
		makeRecommendationsListRepository(),
		makeLikeService()
	)
