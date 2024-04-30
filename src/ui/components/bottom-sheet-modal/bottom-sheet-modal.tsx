import { forwardRef, useImperativeHandle, useMemo } from 'react'
import { BottomSheetModal as BaseBottomSheetModal } from '@gorhom/bottom-sheet'

import { useBottomSheetModalState } from './hooks/use-bottom-sheet-modal-state'

export type BottomSheetModalRef = {
	expand: () => void
	close: () => void
}
export type BottomSheetModalProps = Omit<
	Parameters<typeof BaseBottomSheetModal>[0],
	'index' | 'ref'
>

export const BottomSheetModal = forwardRef<
	BottomSheetModalRef,
	BottomSheetModalProps
>((props, ref) => {
	const { children, snapPoints, ...rest } = props
	const defaultSnapPoints = useMemo(() => ['50%', '75%'], [])
	const { bottomSheetModalRef, handleClose, handleExpand } =
		useBottomSheetModalState()

	useImperativeHandle(
		ref,
		() => ({
			expand: handleExpand,
			close: handleClose,
		}),
		[]
	)

	return (
		<BaseBottomSheetModal
			{...rest}
			ref={bottomSheetModalRef}
			index={1}
			snapPoints={snapPoints || defaultSnapPoints}
		>
			{children}
		</BaseBottomSheetModal>
	)
})

BottomSheetModal.displayName = 'BottomSheetModal'
