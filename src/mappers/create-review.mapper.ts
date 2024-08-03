import type { CreateReviewDTO } from '@/dtos/review.dto'
import type { CreateReviewFields } from '@/schemas/review.schema'

export class CreateReviewMapper {
	static toFirebase(data: CreateReviewDTO) {
		return {
			user_id: data.userId,
			movie_name: data.movieName,
			description: data.description,
			rating: data.rating,
			likes_id: [],
			created_at: new Date(),
		}
	}
	static toService(
		userId: string,
		movieName: string,
		data: CreateReviewFields
	): CreateReviewDTO {
		return {
			description: data.description,
			rating: data.rating,
			movieName,
			userId,
		}
	}
}
