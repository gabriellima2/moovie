import {
	View,
	TouchableWithoutFeedback,
	type TouchableWithoutFeedbackProps,
} from 'react-native'
import colors from 'tailwindcss/colors'
import { Heart } from 'lucide-react-native'

import { Typography } from '@/ui/atoms/typography'

import {
	useLikeButton,
	type UseLikeButtonParams,
} from './hooks/use-like-button'

import { cn } from '@/helpers/cn'

export type LikeButtonProps = Omit<TouchableWithoutFeedbackProps, 'onPress'> & {
	total: number
	showTotal?: boolean
} & Pick<UseLikeButtonParams, 'defaultLiked' | 'onLike'>

export function LikeButton(props: LikeButtonProps) {
	const { total, defaultLiked, showTotal, onLike, className, ...rest } = props
	const { likeCount, isLiked, handleLike } = useLikeButton({
		defaultLiked,
		initialLikeCount: total,
		onLike,
	})
	return (
		<View className={cn('flex-row items-center', className)}>
			<TouchableWithoutFeedback onPress={handleLike} {...rest}>
				<Heart
					size={18}
					color={colors.red[700]}
					fill={isLiked ? colors.red[700] : 'none'}
				/>
			</TouchableWithoutFeedback>
			{showTotal && (
				<Typography.Small className="ml-1 font-heading">
					{likeCount}
				</Typography.Small>
			)}
		</View>
	)
}
