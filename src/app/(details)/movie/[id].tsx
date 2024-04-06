import { ActivityIndicator, Image, ScrollView, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useQueries } from '@tanstack/react-query'

import { ReviewPreview } from '@/ui/components/review-preview'
import { Typography } from '@/ui/atoms/typography'
import { Section } from '@/ui/components/section'

import { makeMovieService } from '@/services/impl/movie.service'
import { makeReviewService } from '@/services/impl/review.service'

import { MovieEntity } from '@/entities/movie.entity'
import { ReviewEntity } from '@/entities/review.entity'

export default function MovieDetails() {
	const { id: name } = useLocalSearchParams()
	const { data, error, isLoading } = useQueries({
		queries: [
			{
				queryFn: () => makeMovieService().getByName(name as string),
				queryKey: ['movie', name],
			},
			{
				queryFn: () => makeReviewService().getByName(name as string),
				queryKey: ['review', name],
			},
		],
		combine: (result) => {
			const [movie, review] = result
			const isLoading = movie.isLoading && review.isLoading
			const error = movie.error || review.error
			const data =
				movie.data && review.data
					? ({ ...movie.data, reviews: review.data } as MovieEntity & {
							reviews: ReviewEntity[]
						})
					: undefined
			return { data, error, isLoading }
		},
	})
	return (
		<ScrollView className="flex-1">
			{isLoading && <ActivityIndicator />}
			{error && <Typography.Paragraph>{error.message}</Typography.Paragraph>}
			{data && (
				<View className="flex-1 px-4">
					<Image
						source={{ uri: data.Poster }}
						style={{ width: '100%', height: undefined, aspectRatio: 4 / 4 }}
						className="rounded-2xl"
					/>
					<View>
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
					</View>
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
