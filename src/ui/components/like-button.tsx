import { useState } from 'react'
import colors from 'tailwindcss/colors'
import { Heart } from 'lucide-react-native'
import {
	View,
	TouchableWithoutFeedback,
	type TouchableWithoutFeedbackProps,
} from 'react-native'

import { Typography } from '../atoms/typography'
import { cn } from '@/helpers/cn'

export type LikeButtonProps = Omit<TouchableWithoutFeedbackProps, 'onPress'> & {
	initialValue?: boolean
	total: number
	showTotal?: boolean
	onPress?: (state: boolean) => void | Promise<void>
}

export function LikeButton(props: LikeButtonProps) {
	const { total, initialValue, showTotal, onPress, className, ...rest } = props
	const [isLiked, setIsLiked] = useState(initialValue)
	return (
		<View className={cn('flex-row items-center', className)}>
			<TouchableWithoutFeedback
				onPress={() => {
					setIsLiked((prevState) => !prevState)
					onPress && onPress(!isLiked)
				}}
				{...rest}
			>
				<Heart
					size={16}
					color={colors.red[700]}
					fill={isLiked ? colors.red[700] : 'none'}
				/>
			</TouchableWithoutFeedback>
			{showTotal && (
				<Typography.Small className="ml-1 font-heading">
					{total}
				</Typography.Small>
			)}
		</View>
	)
}
