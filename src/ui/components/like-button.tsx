import {
	View,
	TouchableWithoutFeedback,
	type TouchableWithoutFeedbackProps,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { Typography } from '../atoms/typography'

type LikeButtonProps = Omit<TouchableWithoutFeedbackProps, 'children'> & {
	isLiked: boolean
	likesCount: number
}

export function LikeButton(props: LikeButtonProps) {
	const { isLiked, likesCount, ...rest } = props
	return (
		<View className="flex-row items-center">
			<TouchableWithoutFeedback {...rest}>
				<FontAwesome
					name={isLiked ? 'heart' : 'heart-o'}
					size={18}
					color={colors.red[700]}
				/>
			</TouchableWithoutFeedback>
			<Typography.Small className="ml-1 font-heading">
				{likesCount}
			</Typography.Small>
		</View>
	)
}
