import { Image, TouchableOpacity, View } from 'react-native'
import { Link } from 'expo-router'

import { Typography } from '../atoms/typography'
import { LikeButton } from './like-button'
import { Rating } from './rating'

import { useGetInformationCreatedByUser } from '@/hooks/use-get-information-created-by-user'

export type ReviewPreviewProps = {
	id: string
	movieName: string
	userID: string
	rating: number
	description: string
	likes: string[]
}

export function ReviewPreview(props: ReviewPreviewProps) {
	const { id, movieName, userID, rating, description, likes } = props
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
				<Link href={`/review/${id}`} asChild>
					<TouchableOpacity
						activeOpacity={0.8}
						className="bg-zinc-100 rounded-2xl p-4"
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
								<LikeButton total={likes.length} showTotal />
							</View>
						</View>
						<Typography.Paragraph numberOfLines={4} className="my-4">
							{description}
						</Typography.Paragraph>
						<Link
							href={`/review/${id}`}
							className="text-black font-medium self-end"
						>
							Read More
						</Link>
					</TouchableOpacity>
				</Link>
			)}
		</>
	)
}
