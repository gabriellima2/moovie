import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { Redirect, Link } from 'expo-router'
import { LogOut, Settings } from 'lucide-react-native'
import colors from 'tailwindcss/colors'

import { Typography } from '@/ui/atoms/typography'
import { Wrapper } from '@/ui/atoms/wrapper'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'

import { makeRecommendationsListService } from '@/services/impl/recommendations-list.service'
import { makeReviewService } from '@/services/impl/review.service'

// Refatorar
export default function Profile() {
	const { user, logout } = useAuthenticationStore()
	const { data, isLoading } = useQuery({
		queryKey: ['user-overview'],
		queryFn: async () => {
			const [reviews, recommendationsList] = await Promise.all([
				makeReviewService().getByUser(user!.uid),
				makeRecommendationsListService().getByUser(user!.uid),
			])
			return { reviews, recommendationsList }
		},
		enabled: !!user,
	})
	if (!user) return <Redirect href="/login" />
	return (
		<Wrapper>
			<View>
				<Typography.Title className="mb-1">{user.displayName}</Typography.Title>
				<Typography.Paragraph>{user.email}</Typography.Paragraph>
			</View>
			<View className="flex-row bg-zinc-100 rounded-xl py-4">
				<TouchableOpacity
					activeOpacity={0.8}
					className="flex-col items-center flex-1"
				>
					{!data && !isLoading && <Typography.Title>?</Typography.Title>}
					{isLoading && <ActivityIndicator />}
					{data && <Typography.Title>{data.reviews.length}</Typography.Title>}
					<Typography.Paragraph>Reviews</Typography.Paragraph>
				</TouchableOpacity>
				<View className="h-full w-[2px] bg-zinc-200" />
				<TouchableOpacity
					activeOpacity={0.8}
					className="flex-col items-center flex-1"
				>
					{!data && !isLoading && <Typography.Title>?</Typography.Title>}
					{isLoading && <ActivityIndicator />}
					{data && (
						<Typography.Title>
							{data.recommendationsList.length}
						</Typography.Title>
					)}
					<Typography.Paragraph>Lists</Typography.Paragraph>
				</TouchableOpacity>
			</View>
			<View>
				<Link href="/search" className="p-4">
					<View className="flex-row items-center">
						<Settings size={24} color={colors.black} className="mr-4" />
						<Typography.Label>Settings</Typography.Label>
					</View>
				</Link>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={logout}
					className="p-4 flex-row items-center"
				>
					<LogOut size={24} color={colors.black} className="mr-4" />
					<Typography.Label>Logout</Typography.Label>
				</TouchableOpacity>
			</View>
		</Wrapper>
	)
}
