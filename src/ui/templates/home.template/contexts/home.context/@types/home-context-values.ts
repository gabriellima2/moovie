import type { UseQueryResult } from '@tanstack/react-query'

import type { RecommendationsListEntity } from '@/entities/recommendations-list.entity'
import type { ReviewEntity } from '@/entities/review.entity'

export type HomeContextValues = {
	reviews: UseQueryResult<ReviewEntity[], Error>
	recommendations: UseQueryResult<RecommendationsListEntity[], Error>
}
