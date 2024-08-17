import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'

export interface RecommendationsListRepository {
	getAll(): Promise<RecommendationsListEntity[]>
	getByID(id: string): Promise<RecommendationsListEntity | undefined>
	getByUser(userID: string): Promise<RecommendationsListEntity[] | undefined>
	append(document: string, movieName: string): Promise<void>
	remove(document: string, movieName: string): Promise<void>
}
