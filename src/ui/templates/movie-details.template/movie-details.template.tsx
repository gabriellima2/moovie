import { ActivityIndicator, Image, ScrollView, View } from 'react-native'

import { ReviewPreview } from '@/ui/components/review-preview'
import { Typography } from '@/ui/atoms/typography'
import { Section } from '@/ui/components/section'
import { ErrorText } from '@/ui/atoms/error-text'

import { useGetMovieDetails } from './hooks/use-get-movie-details'

export type MovieDetailsTemplateProps = {
	name: string
}

export function MovieDetailsTemplate(props: MovieDetailsTemplateProps) {
	const { name } = props
	const { data, error, isLoading } = useGetMovieDetails(name)
	return (
		<ScrollView className="flex-1">
			{isLoading && <ActivityIndicator />}
			{error && <ErrorText text={error.message} />}
			{data && (
				<View className="flex-1">
					<View className="px-4">
						<Image
							source={{ uri: data.Poster }}
							style={{ width: '100%', height: undefined, aspectRatio: 4 / 4 }}
							className="rounded-2xl"
						/>
					</View>
					<Section.Root>
						<Typography.Title>{data.Title}</Typography.Title>
						<Typography.Paragraph>{data.Plot}</Typography.Paragraph>
						<View>
							<Typography.Paragraph>{data.Released}</Typography.Paragraph>
							<Typography.Paragraph>{data.Runtime}</Typography.Paragraph>
							<Typography.Paragraph>{data.imdbRating}</Typography.Paragraph>
						</View>
						<View>
							{data.Genre.split(',').map((genre) => (
								<Typography.Paragraph key={genre}>
									{genre.trim()}
								</Typography.Paragraph>
							))}
							<Typography.Paragraph>{data.Director}</Typography.Paragraph>
						</View>
					</Section.Root>
					<Section.Root>
						<Section.Title>Reviews</Section.Title>
						{data.reviews.map((review) => (
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
						))}
					</Section.Root>
				</View>
			)}
		</ScrollView>
	)
}
