import { forwardRef, useMemo } from 'react'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'

import {
	BottomSheetModal,
	type BottomSheetModalRef,
} from '../bottom-sheet-modal'
import { ReviewReadMoreSkeleton } from '../review-read-more-skeleton'
import { Typography } from '../../atoms/typography'
import { Review } from './components/review'

import { useGetReviewByID } from '@/hooks/use-get-review-by-id'

type ReviewReadMoreBottomSheetProps = {
	id: string | null
	onDismiss: () => void
	onLike?: () => unknown
}

export const ReviewReadMoreBottomSheet = forwardRef<
	BottomSheetModalRef,
	ReviewReadMoreBottomSheetProps
>((props, ref) => {
	const { id, onDismiss } = props
	const { data, isLoading, error } = useGetReviewByID(id)
	const snapPoints = useMemo(() => ['50%', '90%'], [])
	return (
		<BottomSheetModal ref={ref} onDismiss={onDismiss} snapPoints={snapPoints}>
			{isLoading && <ReviewReadMoreSkeleton />}
			{error && <Typography.Subtitle>{error.message}</Typography.Subtitle>}
			{data && (
				<BottomSheetScrollView className="flex-1 mb-4">
					<Review
						id={data.id}
						title={data.movie_name}
						imageUrl={data.movie_image}
						description={data.description}
						rating={data.rating}
						createdBy={data.user_name}
						likeTotal={data.likes_id.length}
					/>
				</BottomSheetScrollView>
			)}
		</BottomSheetModal>
	)
})

ReviewReadMoreBottomSheet.displayName = 'ReviewReadMoreBottomSheet'
