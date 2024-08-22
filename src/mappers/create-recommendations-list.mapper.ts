import type { CreateRecommendationListDTO } from '@/dtos/recommendation-list.dto'
import type { CreateRecommendationsListFields } from '@/schemas/recommendations-list.schema'

export class CreateRecommendationsListMapper {
	static toFirebase(data: CreateRecommendationListDTO) {
		return {
			user_id: data.userId,
			title: data.title,
			description: data.description,
			likes_id: [],
			movies_name: [],
			created_at: new Date(),
		}
	}
	static toService(
		userId: string,
		data: CreateRecommendationsListFields
	): CreateRecommendationListDTO {
		return {
			description: data.description || null,
			title: data.title,
			userId,
		}
	}
}
