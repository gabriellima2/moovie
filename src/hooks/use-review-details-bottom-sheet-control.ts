import { useRef, useState } from 'react'
import { BottomSheetModalRef } from '@/ui/components/bottom-sheet-modal'

export function useReviewDetailsBottomSheetControl() {
	const [reviewId, setReviewId] = useState<string | null>(null)
	const bottomSheetRef = useRef<BottomSheetModalRef>(null)

	function dismissReviewDetailsBottomSheet() {
		setReviewId(null)
	}

	function showReviewDetailsBottomSheet(id: string) {
		setReviewId(id)
		bottomSheetRef.current?.expand()
	}

	return {
		reviewId,
		dismissReviewDetailsBottomSheet,
		showReviewDetailsBottomSheet,
		bottomSheetRef,
	}
}
