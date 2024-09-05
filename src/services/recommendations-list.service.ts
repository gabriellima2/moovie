import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'

import { CreateRecommendationListDTO } from '@/dtos/recommendation-list.dto'
import { LikeDTO } from '@/dtos/like.dtos/like.dto'

export interface RecommendationsListService {
	create(data: CreateRecommendationListDTO): Promise<void>
	getAll(): Promise<RecommendationsListEntity[]>
	getByID(id: string): Promise<RecommendationsListEntity | undefined>
	getByUser(userID: string): Promise<RecommendationsListEntity[]>
	append(id: string, movieName: string): Promise<void>
	remove(id: string, movieName: string): Promise<void>
	createLike(params: LikeDTO): Promise<void>
	deleteLike(params: LikeDTO): Promise<void>
}
