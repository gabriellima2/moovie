import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'

export interface RecommendationsListRepository {
	getAll(): Promise<RecommendationsListEntity[]>
	getByID(id: string): Promise<RecommendationsListEntity | undefined>
	getByUser(userID: string): Promise<RecommendationsListEntity[] | undefined>
}
