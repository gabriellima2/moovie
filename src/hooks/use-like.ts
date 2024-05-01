import { useQuery } from '@tanstack/react-query'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'

import { makeLikeService } from '@/services/impl/like.service'
import { LikeDTO } from '@/dtos/like.dtos/like.dto'

export type UseLikeParams = {
	id: string | null
	create: (params: LikeDTO) => Promise<void>
	remove: (params: LikeDTO) => Promise<void>
}

const likeService = makeLikeService()

export function useLike(params: UseLikeParams) {
	const { id, create, remove } = params
	const { user } = useAuthenticationStore()
	const { data, isLoading } = useQuery({
		queryFn: () =>
			likeService.get({ document_id: id!, user_id: user?.uid ?? '' }),
		queryKey: ['get-like', id, user?.uid ?? ''],
		enabled: !!id,
	})

	async function handleLike(isLiked: boolean) {
		if (!user || !user.uid || !id) return
		if (!isLiked) return await create({ document_id: id, user_id: user.uid })
		await remove({ document_id: id, user_id: user.uid })
	}

	return {
		isLiked: { value: !!data, isLoading },
		handleLike,
	}
}
