import { Image, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'

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
	const { id, title, movieName, userID } = props
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
				<Link href={`/recommendations-list/${id}`} asChild>
					<TouchableOpacity activeOpacity={0.8} className="w-[120px] gap-y-2">
						<Image
							source={{ uri: movie.data.Poster }}
							className="w-full h-[170px] rounded-2xl"
						/>
						<Typography.Title className="text-base" numberOfLines={2}>
							{title}
						</Typography.Title>
						<Typography.Small>Created by {user.data.name}</Typography.Small>
					</TouchableOpacity>
				</Link>
			)}
		</>
	)
}
