import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'
import { CreateRecommendationListDTO } from '@/dtos/recommendation-list.dto'

export interface RecommendationsListRepository {
	create(data: CreateRecommendationListDTO): Promise<void>
	getAll(): Promise<RecommendationsListEntity[]>
	getByID(id: string): Promise<RecommendationsListEntity | undefined>
	getByUser(userID: string): Promise<RecommendationsListEntity[] | undefined>
	append(document: string, movieName: string): Promise<void>
	remove(document: string, movieName: string): Promise<void>
	addLike(id: string, document: string): Promise<void>
	deleteLike(id: string, document: string): Promise<void>
}
