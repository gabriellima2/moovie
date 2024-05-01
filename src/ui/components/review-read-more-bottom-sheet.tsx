import { forwardRef, useMemo } from 'react'
import { Image, View } from 'react-native'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useQuery } from '@tanstack/react-query'
import { User } from 'lucide-react-native'
import colors from 'tailwindcss/colors'

import {
	BottomSheetModal,
	type BottomSheetModalRef,
} from './bottom-sheet-modal'
import { Typography } from '../atoms/typography'
import { LikeButton } from './like-button'
import { Section } from './section'
import { Rating } from './rating'

import { useLike } from '@/hooks/use-like'

import { makeReviewService } from '@/services/impl/review.service'
import { makeMovieService } from '@/services/impl/movie.service'
import { makeUserService } from '@/services/impl/user.service'

type ReviewReadMoreBottomSheetProps = {
	id: string | null
	onDismiss: () => void
}

const services = {
	review: makeReviewService(),
	movie: makeMovieService(),
	user: makeUserService(),
}

export const ReviewReadMoreBottomSheet = forwardRef<
	BottomSheetModalRef,
	ReviewReadMoreBottomSheetProps
>((props, ref) => {
	const { id, onDismiss } = props
	const { data, isLoading, error } = useQuery({
		queryFn: async () => {
			const review = await services.review.getByID(id!)
			if (review) {
				const movie = await services.movie.getByName(review.movie_name)
				const user = await services.user.getByID(review.user_id)
				return { ...review, movie_image: movie.Poster, user_name: user.name }
			}
		},
		queryKey: ['review', id],
		enabled: !!id,
	})
	const { isLiked, handleLike } = useLike({
		id,
		create: services.review.createLike.bind(services.review),
		remove: services.review.deleteLike.bind(services.review),
	})
	const snapPoints = useMemo(() => ['50%', '90%'], [])

	return (
		<BottomSheetModal ref={ref} onDismiss={onDismiss} snapPoints={snapPoints}>
			{isLoading && <Typography.Subtitle>Loading...</Typography.Subtitle>}
			{error && <Typography.Subtitle>{error.message}</Typography.Subtitle>}
			{data && (
				<BottomSheetScrollView className="flex-1 mb-4">
					<View className="flex-1 mt-4">
						<View className="px-4 mb-4">
							<Image
								source={{ uri: data.movie_image }}
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
										{data.movie_name}
									</Typography.Title>
									<LikeButton
										showTotal
										total={data.likes_id.length}
										defaultLiked={isLiked.value}
										onLike={handleLike}
									/>
								</View>
								<Rating value={data.rating} readonly />
								<Typography.Paragraph className="mt-4">
									{data.description}
								</Typography.Paragraph>
							</View>
							<View className="flex-row justify-between flex-wrap py-2">
								<View className="flex-row gap-x-2 items-center">
									<View className="items-center justify-center bg-zinc-200 rounded-full w-8 h-8">
										<User color={colors.black} size={20} />
									</View>
									<Typography.Paragraph>
										Created by {data.user_name}
									</Typography.Paragraph>
								</View>
							</View>
						</Section.Root>
					</View>
				</BottomSheetScrollView>
			)}
		</BottomSheetModal>
	)
})

ReviewReadMoreBottomSheet.displayName = 'ReviewReadMoreBottomSheet'
