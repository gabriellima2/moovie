import { useQuery } from '@tanstack/react-query'

import { makeRecommendationsListService } from '@/services/impl/recommendations-list.service'

import type { RecommendationsListEntity } from '@/entities/recommendations-list.entity'
import type { QueryOptions } from '@/@types/query-options'

const service = makeRecommendationsListService()

export function useGetRecommendationsListByUserId(
	userId: string,
	options?: QueryOptions<RecommendationsListEntity[]>
) {
	const { data: recommendationsList, ...rest } = useQuery({
		queryKey: ['recommendations-list-of-user', { userId }],
		queryFn: () => service.getByUser(userId),
		throwOnError: true,
		...options,
	})
	return { recommendationsList, ...rest }
}
