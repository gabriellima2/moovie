import {
	View,
	TouchableWithoutFeedback,
	type TouchableWithoutFeedbackProps,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { Typography } from '../atoms/typography'

type LikeButtonProps = Omit<TouchableWithoutFeedbackProps, 'children'> & {
	isLiked: boolean
	likesCount: number
}

export function LikeButton(props: LikeButtonProps) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { isLiked, likesCount, ...rest } = props
	return (
		<View className="flex-row items-center">
			<TouchableWithoutFeedback {...rest}>
				<Feather
					name="heart"
					size={18}
					color={colors.red[700]}
					// fill={isLiked ? colors.red[700] : 'none'}
				/>
			</TouchableWithoutFeedback>
			<Typography.Small className="ml-1 font-heading">
				{likesCount}
			</Typography.Small>
		</View>
	)
}
