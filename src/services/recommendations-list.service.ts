import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'

export interface RecommendationsListService {
	getAll(): Promise<RecommendationsListEntity[]>
}
