import { Image, View } from 'react-native'

import { Typography } from '../atoms/typography'
import { LikeButton } from './like-button'
import { Rating } from './rating'

import { useGetInformationCreatedByUser } from '@/hooks/use-get-information-created-by-user'

export type ReviewPreviewProps = {
	movieName: string
	userID: string
	rating: number
	description: string
	likes: string[]
}

export function ReviewPreview(props: ReviewPreviewProps) {
	const { movieName, userID, rating, description, likes } = props
	const [user, movie] = useGetInformationCreatedByUser({ userID, movieName })
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
								<LikeButton total={likes.length} />
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
