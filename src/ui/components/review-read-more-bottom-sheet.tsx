import { forwardRef } from 'react'
import { View } from 'react-native'

import {
	BottomSheetModal,
	type BottomSheetModalRef,
} from './bottom-sheet-modal'
import { Typography } from '../atoms/typography'

type ReviewReadMoreBottomSheetProps = {
	id: string | null
	onDismiss: () => void
}

export const ReviewReadMoreBottomSheet = forwardRef<
	BottomSheetModalRef,
	ReviewReadMoreBottomSheetProps
>((props, ref) => {
	const { id, onDismiss } = props
	return (
		<BottomSheetModal ref={ref} onDismiss={onDismiss}>
			<View>
				<Typography.Title>Hello {id}</Typography.Title>
			</View>
		</BottomSheetModal>
	)
})

ReviewReadMoreBottomSheet.displayName = 'ReviewReadMoreBottomSheet'
