import { useRef } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

export function useBottomSheetModalState() {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null)

	function handleClose() {
		if (!bottomSheetModalRef.current) return
		bottomSheetModalRef.current.dismiss()
	}

	function handleExpand() {
		if (!bottomSheetModalRef.current) return
		bottomSheetModalRef.current.present()
	}

	return {
		bottomSheetModalRef,
		handleClose,
		handleExpand,
	}
}
