import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'

import { makeRecommendationsListService } from '@/services/impl/recommendations-list.service'
import { CreateRecommendationsListMapper } from '@/mappers/create-recommendations-list.mapper'

import type { CreateRecommendationsListFields } from '@/schemas/recommendations-list.schema'

const recommendationsListService = makeRecommendationsListService()

export function useCreateRecommendationsList() {
	const user = useAuthenticationStore((state) => state.user)

	async function handleCreate(values: CreateRecommendationsListFields) {
		if (!user) {
			throw new Error('Error while creating review, user not authenticated')
		}
		await recommendationsListService.create(
			CreateRecommendationsListMapper.toService(user.uid, values)
		)
	}

	return {
		handleCreate,
	}
}
