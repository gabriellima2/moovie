import { ActivityIndicator, TouchableWithoutFeedback, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { MovieImageByName } from './movie-image-by-name'
import { Typography } from '../atoms/typography'
import { ErrorText } from '../atoms/error-text'

import { useGetUserByID } from '@/hooks/use-get-user-by-id'

type RecommendationsListPreviewProps = {
	id: string
	title: string
	userID: string
	moviesName: string[]
	likes: string[]
}

export function RecommendationsListPreview(
	props: RecommendationsListPreviewProps
) {
	const { title, likes, moviesName, userID } = props
	const { data, error, isLoading } = useGetUserByID(userID)
	return (
		<>
			{!data && isLoading && !error && (
				<ActivityIndicator className="self-center" />
			)}
			{!data && isLoading && error && (
				<ErrorText text={(error as Error).message} />
			)}
			{data && !isLoading && !error && (
				<View>
					<View className="relative h-[170px]">
						{moviesName.map((name, i) => (
							<MovieImageByName key={i} position={i} name={name} />
						))}
					</View>
					<View>
						<Typography.Title>{title}</Typography.Title>
						<View>
							<View className="flex-row items-center gap-x-1">
								<Typography.Small>Created by</Typography.Small>
								<Typography.Small className="font-subtitle text-black">
									{data.name}
								</Typography.Small>
							</View>
							<View className="flex-row items-center">
								<TouchableWithoutFeedback>
									<Feather name="heart" size={16} color={colors.black} />
								</TouchableWithoutFeedback>
								<Typography.Small className="font-heading">
									{likes.length}
								</Typography.Small>
							</View>
						</View>
					</View>
				</View>
			)}
		</>
	)
}
