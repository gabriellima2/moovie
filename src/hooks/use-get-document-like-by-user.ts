import { useQuery } from '@tanstack/react-query'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { makeLikeService } from '@/services/impl/like.service'

type UseGetDocumentLikeByUserParams = {
	documentId: string
}

const likeService = makeLikeService()

export function useGetDocumentLikeByUser(
	params: UseGetDocumentLikeByUserParams
) {
	const { documentId } = params
	const { user } = useAuthenticationStore()
	const { data: like, isLoading } = useQuery({
		queryFn: () =>
			likeService.get({ document_id: documentId!, user_id: user!.uid }),
		queryKey: ['get-like', documentId, user?.uid ?? ''],
		enabled: !!documentId && !!user,
		throwOnError: true,
	})
	return { like, isLoading }
}
