import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { LikeDTO } from '@/dtos/like.dto'

export type UseLikeParams = {
	id: string
	create: (params: LikeDTO) => Promise<void>
	remove: (params: LikeDTO) => Promise<void>
}

export function useLike(params: UseLikeParams) {
	const { id, create, remove } = params
	const { user } = useAuthenticationStore()

	async function handleLike(isLiked: boolean) {
		if (!user || !user.uid) return
		if (!isLiked) return await create({ document_id: id, user_id: user.uid })
		await remove({ document_id: id, user_id: user.uid })
	}

	return { handleLike }
}
