import { Image, TouchableWithoutFeedback, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { Typography } from '../atoms/typography'
import { Rating } from './rating'

import { useGetReview } from '@/hooks/use-get-review'

export type ReviewPreviewProps = {
	movieName: string
	userID: string
	rating: number
	description: string
	likes: string[]
}

export function ReviewPreview(props: ReviewPreviewProps) {
	const { movieName, userID, rating, description, likes } = props
	const [user, movie] = useGetReview({ userID, movieName })
	return (
		<>
			{(user.isLoading || movie.isLoading) && (
				<Typography.Small>Loading...</Typography.Small>
			)}
			{!user.data && user.error && (
				<Typography.Small>{user.error.message}</Typography.Small>
			)}
			{!movie.data && movie.error && (
				<Typography.Small>{movie.error.message}</Typography.Small>
			)}
			{user.data && !user.error && movie.data && !movie.error && (
				<View>
					<View>
						<View>
							<Typography.Title>{movie.data.Title}</Typography.Title>
							<View>
								<Typography.Paragraph>
									Review by {user.data.name}
								</Typography.Paragraph>
								<Rating value={rating} readonly />
								<View>
									<TouchableWithoutFeedback>
										<Feather name="heart" size={20} color={colors.black} />
									</TouchableWithoutFeedback>
								</View>
								<Typography.Small>{likes.length}</Typography.Small>
							</View>
						</View>
						<Typography.Paragraph>{description}</Typography.Paragraph>
					</View>
					<Image source={{ uri: movie.data.Poster }} width={40} height={40} />
				</View>
			)}
		</>
	)
}
