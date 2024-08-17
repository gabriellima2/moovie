import { View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { CalendarDays, ChevronLeft, Clock, Star } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import colors from 'tailwindcss/colors'

import { ReviewReadMoreBottomSheet } from '@/ui/components/review-read-more-bottom-sheet'
import { HighlightedInformationGroup } from './components/highlighted-information-group'
import { MovieDetailsSkeleton } from './components/movie-details-skeleton'
import { MovieDetailsProvider } from './contexts/movie-details.context'
import { ReviewPreview } from '@/ui/components/review-preview'
import { Typography } from '@/ui/atoms/typography'
import { Section } from '@/ui/components/section'
import { Header } from '@/ui/components/header'
import { Actions } from './components/actions'

import { useReviewDetailsBottomSheetControl } from '@/hooks/use-review-details-bottom-sheet-control'
import { useGetMovieDetails } from './hooks/use-get-movie-details'

export type MovieDetailsTemplateProps = {
	name: string
}

export function MovieDetailsTemplate(props: MovieDetailsTemplateProps) {
	const { name } = props
	const router = useRouter()
	const {
		reviewId,
		bottomSheetRef,
		dismissReviewDetailsBottomSheet,
		showReviewDetailsBottomSheet,
	} = useReviewDetailsBottomSheetControl()
	const { data, isLoading, isFetching, refetch } = useGetMovieDetails(name)
	const hasData = !!data
	return (
		<MovieDetailsProvider movieName={name}>
			<Header.Root>
				<TouchableOpacity accessibilityLabel="Voltar" onPress={router.back}>
					<ChevronLeft size={24} color={colors.black} />
				</TouchableOpacity>
				<Actions.Trigger />
			</Header.Root>
			<ScrollView className="flex-1">
				{(isLoading || isFetching) && <MovieDetailsSkeleton />}
				{hasData && (
					<>
						<ScrollView className="flex-1">
							<View className="flex-1 mt-4">
								<View className="px-4 mb-4">
									<Image
										source={{ uri: data.Poster }}
										style={{
											width: '100%',
											height: undefined,
											aspectRatio: 4 / 4,
										}}
										className="rounded-2xl"
									/>
								</View>
								<Section.Root className="gap-y-4 mb-4">
									<Typography.Title>{data.Title}</Typography.Title>
									<Typography.Paragraph>{data.Plot}</Typography.Paragraph>
									<View className="flex-row justify-between flex-wrap py-2">
										<View className="flex-row gap-x-2 items-center">
											<Clock color={colors.black} size={20} />
											<Typography.Paragraph>
												{data.Runtime}
											</Typography.Paragraph>
										</View>
										<View className="flex-row gap-x-2 items-center">
											<CalendarDays color={colors.black} size={20} />
											<Typography.Paragraph>
												{data.Released}
											</Typography.Paragraph>
										</View>
										<View className="flex-row items-center">
											<Star
												fill={colors.black}
												color={colors.black}
												size={20}
												className="mr-2"
											/>
											<Typography.Paragraph>
												{data.imdbRating}/
											</Typography.Paragraph>
											<Typography.Small>10</Typography.Small>
										</View>
									</View>
									<View>
										<HighlightedInformationGroup
											label="Genre"
											values={data.Genre.split(',')}
										/>
										<HighlightedInformationGroup
											label="Director"
											values={data.Director}
										/>
									</View>
								</Section.Root>
								<Section.Root>
									<Section.Title>Reviews</Section.Title>
									{!data.reviews.length ? (
										<Typography.Paragraph className="text-center">
											There are no reviews for this movie at the moment
										</Typography.Paragraph>
									) : (
										data.reviews.map((review) => (
											<View key={review.id} className="mb-4">
												<ReviewPreview
													id={review.id}
													title={data.Title}
													reviewBy={review.user.name}
													imageUrl={data.Poster}
													likes={review.likes_id}
													description={review.description}
													rating={review.rating}
													onPress={showReviewDetailsBottomSheet}
													highlighted
												/>
											</View>
										))
									)}
								</Section.Root>
							</View>
						</ScrollView>
						<ReviewReadMoreBottomSheet
							id={reviewId}
							ref={bottomSheetRef}
							onDismiss={dismissReviewDetailsBottomSheet}
							onLike={refetch}
						/>
					</>
				)}
			</ScrollView>
			{hasData && <Actions.Menu title={data.Title} />}
		</MovieDetailsProvider>
	)
}
