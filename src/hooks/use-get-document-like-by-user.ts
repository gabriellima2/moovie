import { useQuery } from '@tanstack/react-query'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { makeLikeService } from '@/services/impl/like.service'

import { QUERY_KEYS } from '@/constants/keys'

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
		queryKey: [QUERY_KEYS.GET_USER_LIKES, documentId, user?.uid ?? ''],
		enabled: !!documentId && !!user,
		throwOnError: true,
	})
	return { like, isLoading }
}
