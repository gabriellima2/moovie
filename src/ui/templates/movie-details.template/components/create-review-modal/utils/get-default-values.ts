import { CreateReviewFields } from '@/schemas/review.schema'

export function getDefaultValues(): CreateReviewFields {
	return {
		description: '',
		rating: 0,
	}
}
