import { BottomSheet } from '@/ui/components/bottom-sheet'
import { Typography } from '@/ui/atoms/typography'

import { useMovieDetailsContext } from '../contexts/movie-details.context'

export function CreateReviewModal() {
	const { isOpenCreateReviewModal, closeCreateReviewModal } =
		useMovieDetailsContext()
	if (!isOpenCreateReviewModal) return null
	return (
		<BottomSheet onClose={closeCreateReviewModal}>
			<Typography.Title className="mb-4 text-base text-center">
				Criar review
			</Typography.Title>
		</BottomSheet>
	)
}
