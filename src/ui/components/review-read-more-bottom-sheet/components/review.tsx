import { Image, View } from 'react-native'
import { User } from 'lucide-react-native'
import colors from 'tailwindcss/colors'

import { Typography } from '@/ui/atoms/typography'
import { LikeButton } from '../../like-button'
import { Section } from '../../section'
import { Rating } from '../../rating'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { useGetDocumentLikeByUser } from '@/hooks/use-get-document-like-by-user'
import { useLike } from '@/hooks/use-like'

import { makeReviewService } from '@/services/impl/review.service'

type ReviewProps = {
	id: string
	title: string
	imageUrl: string
	likeTotal: number
	rating: number
	description: string
	createdBy: string
}

const reviewService = makeReviewService()

export function Review(props: ReviewProps) {
	const { like } = useGetDocumentLikeByUser({ documentId: props.id })
	const user = useAuthenticationStore((state) => state.user)
	const { isLiked, likesCount, handleLike } = useLike({
		initialValue: !!like,
		initialTotal: props.likeTotal,
		createLike: () =>
			reviewService.createLike({ document_id: props.id, user_id: user!.uid }),
		deleteLike: () =>
			reviewService.deleteLike({ document_id: props.id, user_id: user!.uid }),
	})
	return (
		<View className="flex-1 mt-4">
			<View className="px-4 mb-4">
				<Image
					source={{ uri: props.imageUrl }}
					style={{
						width: '100%',
						height: undefined,
						aspectRatio: 4 / 4,
					}}
					className="rounded-2xl"
				/>
			</View>
			<Section.Root className="gap-y-4 mb-4">
				<View className="items-start">
					<View className="w-full flex-row items-center justify-between mb-4">
						<Typography.Title className="capitalize">
							{props.title}
						</Typography.Title>
						<LikeButton
							isLiked={isLiked}
							likesCount={likesCount}
							onPress={() => handleLike(!!isLiked)}
						/>
					</View>
					<Rating value={props.rating} readonly />
					<Typography.Paragraph className="mt-4">
						{props.description}
					</Typography.Paragraph>
				</View>
				<View className="flex-row justify-between flex-wrap py-2">
					<View className="flex-row gap-x-2 items-center">
						<View className="items-center justify-center bg-zinc-200 rounded-full w-8 h-8">
							<User color={colors.black} size={20} />
						</View>
						<Typography.Paragraph>
							Review by {props.createdBy}
						</Typography.Paragraph>
					</View>
				</View>
			</Section.Root>
		</View>
	)
}
