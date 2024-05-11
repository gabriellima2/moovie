import type { UseQueryResult } from '@tanstack/react-query'

import type { RecommendationsListDTO } from '@/dtos/recommendation-list.dto'
import type { ReviewEntity } from '@/entities/review.entity'

export type HomeContextValues = {
	reviews: UseQueryResult<ReviewEntity[], Error>
	recommendations: UseQueryResult<RecommendationsListDTO[], Error>
}
