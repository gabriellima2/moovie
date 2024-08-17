import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'

export interface RecommendationsListService {
	getAll(): Promise<RecommendationsListEntity[]>
	getByID(id: string): Promise<RecommendationsListEntity | undefined>
	getByUser(userID: string): Promise<RecommendationsListEntity[]>
	append(id: string, movieName: string): Promise<void>
	remove(id: string, movieName: string): Promise<void>
}
