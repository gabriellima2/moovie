import { PropsWithChildren, forwardRef, useImperativeHandle } from 'react'
import colors from 'tailwindcss/colors'
import GorhomBottomSheet, {
	BottomSheetScrollView,
	BottomSheetProps as GorhomBottomSheetProps,
} from '@gorhom/bottom-sheet'

import { BottomSheetOverlay } from '@/ui/atoms/bottom-sheet-overlay'
import { useBottomSheetState } from './hooks/use-bottom-sheet-state'

export type BottomSheetRef = {
	expand: () => void
	close: () => void
}

export type BottomSheetProps = GorhomBottomSheetProps &
	PropsWithChildren & {
		withoutScrollView?: boolean
	}

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
	(props, ref) => {
		const { children, withoutScrollView } = props
		const { bottomSheetRef, handleClose, handleExpand } = useBottomSheetState()

		useImperativeHandle(
			ref,
			() => ({
				expand: handleExpand,
				close: handleClose,
			}),
			[]
		)

		return (
			<GorhomBottomSheet
				{...props}
				ref={bottomSheetRef}
				detached
				enablePanDownToClose
				enableDynamicSizing
				backdropComponent={BottomSheetOverlay}
				backgroundStyle={{ backgroundColor: colors.white }}
				handleIndicatorStyle={{
					marginTop: 4,
					backgroundColor: colors.zinc[400],
				}}
			>
				{withoutScrollView ? (
					<>{children}</>
				) : (
					<BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
						{children}
					</BottomSheetScrollView>
				)}
			</GorhomBottomSheet>
		)
	}
)

BottomSheet.displayName = 'BottomSheet'
