import {
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { CalendarDays, ChevronLeft, User } from 'lucide-react-native'
import colors from 'tailwindcss/colors'
import { format } from 'date-fns'

import { Typography } from '@/ui/atoms/typography'
import { Header } from '@/ui/components/header'

import { useGetRecommendationsListById } from '@/hooks/use-get-recommendations-list-by-id'

export default function RecommendationsList() {
	const { id } = useLocalSearchParams()
	const { data, isLoading, isFetching } = useGetRecommendationsListById(
		id as string
	)
	const router = useRouter()
	return (
		<>
			<Header.Root>
				<TouchableOpacity accessibilityLabel="Voltar" onPress={router.back}>
					<ChevronLeft size={24} color={colors.black} />
				</TouchableOpacity>
			</Header.Root>
			<ScrollView className="flex-1">
				{(isLoading || isFetching) && <ActivityIndicator />}
				{!!data && (
					<ScrollView className="flex-1 px-4 pb-4">
						<View className="mb-4">
							<Typography.Title className="mb-4">{data.title}</Typography.Title>
							<View className="flex-row items-center justify-between mb-4">
								<View className="flex-row gap-x-2 items-center">
									<View className="items-center justify-center bg-zinc-200 rounded-full w-8 h-8">
										<User color={colors.black} size={20} />
									</View>
									<Typography.Paragraph>
										Created by {data.user.name}
									</Typography.Paragraph>
								</View>
								<Typography.Small>
									{format(
										new Date(data.created_at.seconds * 1000).toISOString(),
										'dd/MM/yyyy'
									)}
								</Typography.Small>
							</View>
							<Typography.Paragraph>{data.description}</Typography.Paragraph>
						</View>
						<View className="gap-y-4">
							{data.movies.map((movie) => (
								<TouchableOpacity
									key={movie.Title}
									activeOpacity={0.8}
									className="bg-zinc-100 rounded-2xl p-4"
									onPress={() =>
										router.push(`/movie/${movie.Title.trim().toLowerCase()}`)
									}
								>
									<View className="flex-row gap-x-4">
										<Image
											source={{ uri: movie.Poster }}
											width={80}
											height={100}
											className="rounded-xl"
										/>
										<View className="flex-row justify-between items-start flex-1">
											<View className="flex-col items-start">
												<View className="mb-8">
													<View className="mb-4">
														<Typography.Title className="text-base">
															{movie.Title}
														</Typography.Title>
														<Typography.Paragraph
															className="mt-1"
															numberOfLines={3}
														>
															{movie.Plot}
														</Typography.Paragraph>
													</View>
													<View className="flex-row justify-between">
														<View className="flex-row gap-x-2 items-center">
															<CalendarDays color={colors.black} size={20} />
															<Typography.Paragraph>
																{movie.Released}
															</Typography.Paragraph>
														</View>
														<Typography.Paragraph>
															IMDb {movie.imdbRating}/10
														</Typography.Paragraph>
													</View>
												</View>
											</View>
										</View>
										<Typography.Subtitle className="text-sm text-black self-end">
											More Details
										</Typography.Subtitle>
									</View>
								</TouchableOpacity>
							))}
						</View>
					</ScrollView>
				)}
			</ScrollView>
		</>
	)
}
