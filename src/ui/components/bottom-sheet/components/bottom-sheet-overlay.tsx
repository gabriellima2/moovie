import { StyleSheet } from 'react-native'
import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'

export function BottomSheetOverlay(props: BottomSheetBackdropProps) {
	return (
		<BottomSheetBackdrop
			{...props}
			opacity={0.4}
			enableTouchThrough={false}
			appearsOnIndex={0}
			disappearsOnIndex={-1}
			style={[
				{ backgroundColor: 'rgba(0, 0, 0, 1)' },
				StyleSheet.absoluteFillObject,
			]}
		/>
	)
}
