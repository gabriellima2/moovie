import { View, Image, TouchableOpacity } from 'react-native'
import { Heart } from 'lucide-react-native'

import { Typography } from '../atoms/typography'
import { Rating } from './rating'

import { cn } from '@/helpers/cn'

export type ReviewPreviewProps = {
	id: string
	imageUrl: string
	title: string
	rating: number
	description: string
	likes: string[]
	reviewBy: string
	highlighted?: boolean
	onPress?: (id: string) => void
}

export function ReviewPreview(props: ReviewPreviewProps) {
	const { id, likes, highlighted, onPress, ...rest } = props
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className={cn({ 'bg-zinc-100 rounded-2xl p-4': highlighted })}
			onPress={() => onPress && onPress(id)}
		>
			<View className="flex-row gap-x-4">
				<Image
					source={{ uri: rest.imageUrl }}
					width={80}
					height={100}
					className="rounded-xl"
				/>
				<View className="flex-row justify-between items-start flex-1">
					<View className="flex-col items-start">
						<View className="mb-4">
							<Typography.Title className="text-base">
								{rest.title}
							</Typography.Title>
							<Typography.Small className="mt-1">
								Review by {rest.reviewBy}
							</Typography.Small>
						</View>
						<Rating value={rest.rating} readonly />
					</View>
					<View className="flex-row items-center">
						<Heart size={18} color="#000000" fill="#000000" />
						<Typography.Small className="ml-1 font-heading">
							{likes.length}
						</Typography.Small>
					</View>
				</View>
			</View>
			<Typography.Paragraph numberOfLines={4} className="my-4">
				{rest.description}
			</Typography.Paragraph>
			<Typography.Subtitle className="text-sm text-black self-end">
				Read More
			</Typography.Subtitle>
		</TouchableOpacity>
	)
}
