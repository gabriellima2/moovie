import type { UseQueryResult } from '@tanstack/react-query'

import type { RecommendationListDTO } from '@/dtos/recommendation-list.dto'
import type { ReviewDTO } from '@/dtos/review.dto'

export type HomeContextValues = {
	reviews: UseQueryResult<ReviewDTO[], Error>
	recommendations: UseQueryResult<RecommendationListDTO[], Error>
}
