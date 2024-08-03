import type { CreateReviewDTO } from '@/dtos/review.dto'
import type { CreateReviewFields } from '@/schemas/review.schema'

export class CreateReviewMapper {
	static toFirebase(
		userId: string,
		movieName: string,
		values: CreateReviewFields
	): CreateReviewDTO {
		return {
			user_id: userId,
			movie_name: movieName,
			description: values.description,
			rating: values.rating,
			likes_id: [],
			created_at: new Date(),
		}
	}
}
