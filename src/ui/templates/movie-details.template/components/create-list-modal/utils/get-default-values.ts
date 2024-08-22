import { CreateRecommendationsListFields } from '@/schemas/recommendations-list.schema'

export function getDefaultValues(): CreateRecommendationsListFields {
	return {
		description: '',
		title: '',
	}
}
