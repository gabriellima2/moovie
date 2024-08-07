import { TouchableOpacity, View } from 'react-native'
import { Plus } from 'lucide-react-native'
import colors from 'tailwindcss/colors'

import { BottomSheet } from '@/ui/components/bottom-sheet'
import { Typography } from '@/ui/atoms/typography'

import { useMovieDetailsContext } from '../../contexts/movie-details.context'

export function AddToListModal() {
	const { closeAddToListModal } = useMovieDetailsContext()
	return (
		<BottomSheet onClose={closeAddToListModal}>
			<View className="mb-4 flex-row justify-between">
				<Typography.Title className="text-base">
					Add movie to...
				</Typography.Title>
				<TouchableOpacity activeOpacity={0.8} className="flex-row items-center">
					<Plus size={20} color={colors.black} />
					<Typography.Label className="ml-2">New list</Typography.Label>
				</TouchableOpacity>
			</View>
		</BottomSheet>
	)
}
