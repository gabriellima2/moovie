import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'

export interface RecommendationsListRepository {
	getAll(): Promise<RecommendationsListEntity[]>
}
