import { Image, TouchableOpacity, View } from 'react-native'

import { Typography } from '../atoms/typography'
import { LikeButton } from './like-button'
import { Rating } from './rating'

import { useGetInformationCreatedByUser } from '@/hooks/use-get-information-created-by-user'
import { useLike } from '@/hooks/use-like'

import { makeReviewService } from '@/services/impl/review.service'
import { ReviewPreviewSkeleton } from './review-preview-skeleton'

import { cn } from '@/helpers/cn'

export type ReviewPreviewProps = {
	id: string
	movieName: string
	userID: string
	rating: number
	description: string
	likes: string[]
	highlighted?: boolean
	onPress?: (id: string) => void
}

const reviewService = makeReviewService()

export function ReviewPreview(props: ReviewPreviewProps) {
	const {
		id,
		movieName,
		userID,
		rating,
		description,
		likes,
		highlighted,
		onPress,
	} = props
	const [user, movie] = useGetInformationCreatedByUser({ userID, movieName })
	const { isLiked, handleLike } = useLike({
		id,
		create: reviewService.createLike.bind(reviewService),
		remove: reviewService.deleteLike.bind(reviewService),
	})
	return (
		<>
			{(user.isLoading || movie.isLoading || isLiked.isLoading) && (
				<ReviewPreviewSkeleton.Item />
			)}
			{!user.data && user.error && (
				<Typography.Small>{user.error.message}</Typography.Small>
			)}
			{!movie.data && movie.error && (
				<Typography.Small>{movie.error.message}</Typography.Small>
			)}
			{user.data && !user.error && movie.data && !movie.error && (
				<TouchableOpacity
					activeOpacity={0.8}
					className={cn({ 'bg-zinc-100 rounded-2xl p-4': highlighted })}
					onPress={() => onPress && onPress(id)}
				>
					<View className="flex-row gap-x-4">
						<Image
							source={{ uri: movie.data.Poster }}
							width={80}
							height={100}
							className="rounded-xl"
						/>
						<View className="flex-row justify-between items-start flex-1">
							<View>
								<View className="mb-4">
									<Typography.Title className="text-base">
										{movie.data.Title}
									</Typography.Title>
									<Typography.Small className="mt-1">
										Review by {user.data.name}
									</Typography.Small>
								</View>
								<Rating value={rating} readonly />
							</View>
							<LikeButton
								showTotal
								total={likes.length}
								defaultLiked={isLiked.value}
								onLike={handleLike}
							/>
						</View>
					</View>
					<Typography.Paragraph numberOfLines={4} className="my-4">
						{description}
					</Typography.Paragraph>
					<Typography.Subtitle className="text-sm text-black self-end">
						Read More
					</Typography.Subtitle>
				</TouchableOpacity>
			)}
		</>
	)
}
