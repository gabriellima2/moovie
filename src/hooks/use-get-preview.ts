import { useQueries } from '@tanstack/react-query'

import { makeRecommendationsListService } from '@/services/impl/recommendations-list.service'
import { makeReviewService } from '@/services/impl/review.service'

const reviewService = makeReviewService()
const recommendationsListService = makeRecommendationsListService()

export function useGetPreview() {
	return useQueries({
		queries: [
			{
				queryKey: ['review_preview'],
				queryFn: () => reviewService.getAll(),
			},
			{
				queryKey: ['recommendations_list_preview'],
				queryFn: () => recommendationsListService.getAll(),
			},
		],
	})
}
