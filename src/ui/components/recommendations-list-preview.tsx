import { Image, View } from 'react-native'

import { Typography } from '../atoms/typography'
import { useGetInformationCreatedByUser } from '@/hooks/use-get-information-created-by-user'

type RecommendationsListPreviewProps = {
	id: string
	title: string
	userID: string
	movieName: string
}

export function RecommendationsListPreview(
	props: RecommendationsListPreviewProps
) {
	const { title, movieName, userID } = props
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
				<View className="w-[120px] gap-y-2">
					<Image
						source={{ uri: movie.data.Poster }}
						className="w-full h-[170px] rounded-lg"
					/>
					<Typography.Title className="text-base">{title}</Typography.Title>
					<Typography.Small>Created by {user.data.name}</Typography.Small>
				</View>
			)}
		</>
	)
}
