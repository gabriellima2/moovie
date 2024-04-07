import { Image, ScrollView, View } from 'react-native'
import { CalendarDays, Clock, Star } from 'lucide-react-native'
import colors from 'tailwindcss/colors'

import { HighlightedInformationGroup } from './components/highlighted-information-group'
import { ReviewPreview } from '@/ui/components/review-preview'
import { Typography } from '@/ui/atoms/typography'
import { Section } from '@/ui/components/section'
import { ErrorText } from '@/ui/atoms/error-text'
import { Skeleton } from './components/skeleton'

import { useGetMovieDetails } from './hooks/use-get-movie-details'

export type MovieDetailsTemplateProps = {
	name: string
}

export function MovieDetailsTemplate(props: MovieDetailsTemplateProps) {
	const { name } = props
	const { data, error, isLoading } = useGetMovieDetails(name)
	return (
		<ScrollView className="flex-1 mb-4">
			{true && <Skeleton />}
			{error && <ErrorText text={error.message} />}
			{data && (
				<View className="flex-1 mt-4">
					<View className="px-4 mb-4">
						<Image
							source={{ uri: data.Poster }}
							style={{ width: '100%', height: undefined, aspectRatio: 4 / 4 }}
							className="rounded-2xl"
						/>
					</View>
					<Section.Root className="gap-y-4 mb-4">
						<Typography.Title>{data.Title}</Typography.Title>
						<Typography.Paragraph>{data.Plot}</Typography.Paragraph>
						<View className="flex-row justify-between flex-wrap py-2">
							<View className="flex-row gap-x-2 items-center">
								<Clock color={colors.black} size={20} />
								<Typography.Paragraph>{data.Runtime}</Typography.Paragraph>
							</View>
							<View className="flex-row gap-x-2 items-center">
								<CalendarDays color={colors.black} size={20} />
								<Typography.Paragraph>{data.Released}</Typography.Paragraph>
							</View>
							<View className="flex-row items-center">
								<Star
									fill={colors.black}
									color={colors.black}
									size={20}
									className="mr-2"
								/>
								<Typography.Paragraph>{data.imdbRating}/</Typography.Paragraph>
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
										movieName={review.movie_name}
										likes={review.likes_id}
										userID={review.user_id}
										description={review.description}
										rating={review.rating}
									/>
								</View>
							))
						)}
					</Section.Root>
				</View>
			)}
		</ScrollView>
	)
}
