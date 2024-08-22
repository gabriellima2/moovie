import { RecommendationsListService } from '../recommendations-list.service'

import { makeRecommendationsListRepository } from '@/repositories/impl/firebase/recommendations-list.repository'

import { RecommendationsListRepository } from '@/repositories/recommendations-list.repository'
import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'
import { CreateRecommendationListDTO } from '@/dtos/recommendation-list.dto'

class RecommendationsListServiceImpl implements RecommendationsListService {
	constructor(private readonly repository: RecommendationsListRepository) {}
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
}

export const makeRecommendationsListService = () =>
	new RecommendationsListServiceImpl(makeRecommendationsListRepository())
