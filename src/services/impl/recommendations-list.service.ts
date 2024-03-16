import { RecommendationsListService } from '../recommendations-list.service'

import { makeRecommendationsListRepository } from '@/repositories/impl/recommendations-list.repository'

import { RecommendationsListRepository } from '@/repositories/recommendations-list.repository'
import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'

class RecommendationsListServiceImpl implements RecommendationsListService {
	constructor(private readonly repository: RecommendationsListRepository) {}
	async getAll(): Promise<RecommendationsListEntity[]> {
		return await this.repository.getAll()
	}
	async getByID(id: string): Promise<RecommendationsListEntity | undefined> {
		return await this.repository.getByID(id)
	}
}

export const makeRecommendationsListService = () =>
	new RecommendationsListServiceImpl(makeRecommendationsListRepository())
