import { TouchableOpacity } from 'react-native'
import { EllipsisVertical, ListPlus, Plus } from 'lucide-react-native'
import colors from 'tailwindcss/colors'

import { useMovieDetailsContext } from '../contexts/movie-details.context'

import { BottomSheet } from '@/ui/components/bottom-sheet'
import { Typography } from '@/ui/atoms/typography'

export type MenuProps = {
	title: string
}

function Trigger() {
	const { openActionsMenu } = useMovieDetailsContext()
	return (
		<TouchableOpacity
			onPress={openActionsMenu}
			accessibilityLabel="Menu"
			activeOpacity={0.6}
		>
			<EllipsisVertical size={20} color={colors.black} />
		</TouchableOpacity>
	)
}

function Menu(props: MenuProps) {
	const {
		isOpenActionsMenu,
		closeActionsMenu,
		openCreateReviewModal,
		openAddToListModal,
	} = useMovieDetailsContext()
	if (!isOpenActionsMenu) return null
	return (
		<BottomSheet onClose={closeActionsMenu}>
			<Typography.Title className="mb-4 text-base text-center">
				{props.title}
			</Typography.Title>
			<TouchableOpacity
				onPress={openCreateReviewModal}
				className="flex-row py-3"
				activeOpacity={0.6}
			>
				<Plus size={20} color={colors.black} className="mr-4" />
				<Typography.Label>Create Review</Typography.Label>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={openAddToListModal}
				className="flex-row py-3"
				activeOpacity={0.6}
			>
				<ListPlus size={20} color={colors.black} className="mr-4" />
				<Typography.Label>Add to list</Typography.Label>
			</TouchableOpacity>
		</BottomSheet>
	)
}

export const Actions = {
	Trigger,
	Menu,
}
