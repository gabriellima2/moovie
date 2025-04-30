import { TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { Typography } from '@/ui/atoms/typography'

export type SearchHistoryItemProps = {
	value: string
	onPress: (value: string) => void
	onFillPress: (value: string) => void
}

export function SearchHistoryItem(props: SearchHistoryItemProps) {
	const { value, onPress, onFillPress } = props
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			onPress={() => onPress(value)}
			className="flex-row items-center justify-between py-3 px-4"
		>
			<View className="flex-row items-center gap-x-4">
				<Feather name="search" color={colors.black} size={20} />
				<Typography.Paragraph className="text-black">
					{value}
				</Typography.Paragraph>
			</View>
			<TouchableOpacity
				hitSlop={12}
				activeOpacity={0.6}
				onPress={() => onFillPress(value)}
			>
				<Feather name="arrow-up-left" color={colors.black} size={20} />
			</TouchableOpacity>
		</TouchableOpacity>
	)
}
