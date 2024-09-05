import { LikeButton } from '@/ui/components/like-button'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { useGetDocumentLikeByUser } from '@/hooks/use-get-document-like-by-user'
import { useLike } from '@/hooks/use-like'

import { makeRecommendationsListService } from '@/services/impl/recommendations-list.service'

type LikeRecommendationsListProps = {
	documentId: string
	likeTotal: number
}

const recommendationsListService = makeRecommendationsListService()

export function LikeRecommendationsList(props: LikeRecommendationsListProps) {
	const { documentId, likeTotal } = props
	const { like } = useGetDocumentLikeByUser({ documentId })
	const user = useAuthenticationStore((state) => state.user)
	const { isLiked, likesCount, handleLike } = useLike({
		initialValue: !!like,
		initialTotal: likeTotal,
		createLike: () =>
			recommendationsListService.createLike({
				document_id: documentId,
				user_id: user!.uid,
			}),
		deleteLike: () =>
			recommendationsListService.deleteLike({
				document_id: documentId,
				user_id: user!.uid,
			}),
	})
	return (
		<LikeButton
			isLiked={isLiked}
			likesCount={likesCount}
			onPress={() => handleLike(!!isLiked)}
		/>
	)
}
