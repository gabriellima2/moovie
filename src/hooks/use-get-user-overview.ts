import { useQuery } from '@tanstack/react-query'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'

import { makeRecommendationsListService } from '@/services/impl/recommendations-list.service'
import { makeReviewService } from '@/services/impl/review.service'
import { QUERY_KEYS } from '@/constants/keys'

export function useGetUserOverview() {
	const { user } = useAuthenticationStore()
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USER_OVERVIEW, user?.uid],
		queryFn: async () => {
			const [reviews, recommendationsList] = await Promise.all([
				makeReviewService().getByUser(user!.uid),
				makeRecommendationsListService().getByUser(user!.uid),
			])
			return { reviews, recommendationsList }
		},
		throwOnError: true,
		enabled: !!user,
	})
}
