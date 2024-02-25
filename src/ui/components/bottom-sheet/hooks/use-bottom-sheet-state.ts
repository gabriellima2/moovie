import { useRef } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'

export function useBottomSheetState() {
	const bottomSheetRef = useRef<BottomSheet>(null)

	function handleClose() {
		if (!bottomSheetRef.current) return
		bottomSheetRef.current.close()
	}

	function handleExpand() {
		if (!bottomSheetRef.current) return
		bottomSheetRef.current.expand()
	}

	return {
		bottomSheetRef,
		handleClose,
		handleExpand,
	}
}
