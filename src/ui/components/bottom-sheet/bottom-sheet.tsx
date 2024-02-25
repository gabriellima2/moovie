import { forwardRef, useImperativeHandle } from 'react'
import { ViewProps } from 'react-native'
import colors from 'tailwindcss/colors'
import GorhomBottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'

import { BottomSheetOverlay } from './components/bottom-sheet-overlay'
import { useBottomSheetState } from './hooks/use-bottom-sheet-state'

export type BottomSheetRef = {
	expand: () => void
	close: () => void
}

export type BottomSheetProps = ViewProps

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
	(props, ref) => {
		const { children } = props
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
				backgroundStyle={{ backgroundColor: colors.zinc[200] }}
				handleIndicatorStyle={{
					marginTop: 4,
					backgroundColor: colors.zinc[400],
				}}
			>
				<BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
					{children}
				</BottomSheetScrollView>
			</GorhomBottomSheet>
		)
	}
)

BottomSheet.displayName = 'BottomSheet'
