import { View, Image, TouchableOpacity } from 'react-native'

import { Typography } from '../atoms/typography'
import { LikeButton } from './like-button'
import { Rating } from './rating'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { useGetDocumentLikeByUser } from '@/hooks/use-get-document-like-by-user'
import { useLike } from '@/hooks/use-like'

import { makeReviewService } from '@/services/impl/review.service'

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

const reviewService = makeReviewService()

export function ReviewPreview(props: ReviewPreviewProps) {
	const { id, likes, highlighted, onPress, ...rest } = props
	const { user } = useAuthenticationStore()
	const { like } = useGetDocumentLikeByUser({ documentId: id })
	const { isLiked, likesCount, handleLike } = useLike({
		initialValue: !!like,
		initialTotal: likes.length,
		createLike: () =>
			reviewService.createLike({ document_id: id, user_id: user!.uid }),
		deleteLike: () =>
			reviewService.deleteLike({ document_id: id, user_id: user!.uid }),
	})
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
					<View>
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
					<LikeButton
						isLiked={isLiked}
						likesCount={likesCount}
						onPress={() => handleLike(!!isLiked)}
					/>
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
