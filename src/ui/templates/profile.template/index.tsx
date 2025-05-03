import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Redirect } from 'expo-router'
import colors from 'tailwindcss/colors'

import { Typography } from '@/ui/atoms/typography'
import { Wrapper } from '@/ui/atoms/wrapper'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'

import { useGetUserOverview } from '@/hooks/use-get-user-overview'

export function ProfileTemplate() {
	const { user, logout } = useAuthenticationStore()
	const { data, isLoading } = useGetUserOverview()
	if (!user) return <Redirect href="/login" />
	return (
		<Wrapper>
			{user.isAnonymous ? (
				<Typography.Title className="mb-1">Guest</Typography.Title>
			) : (
				<View>
					<Typography.Title className="mb-1">
						{user.displayName}
					</Typography.Title>
					<Typography.Paragraph>{user.email}</Typography.Paragraph>
				</View>
			)}
			<View className="flex-row bg-zinc-100 rounded-xl py-4">
				<TouchableOpacity
					activeOpacity={0.8}
					className="flex-col items-center flex-1"
				>
					{isLoading ? (
						<ActivityIndicator />
					) : (
						<Typography.Title>{data?.reviews?.length || 0}</Typography.Title>
					)}
					<Typography.Paragraph>Reviews</Typography.Paragraph>
				</TouchableOpacity>
				<View className="h-full w-[2px] bg-zinc-200" />
				<TouchableOpacity
					activeOpacity={0.8}
					className="flex-col items-center flex-1"
				>
					{isLoading ? (
						<ActivityIndicator />
					) : (
						<Typography.Title>
							{data?.recommendationsList?.length || 0}
						</Typography.Title>
					)}
					<Typography.Paragraph>Lists</Typography.Paragraph>
				</TouchableOpacity>
			</View>
			<View>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={logout}
					className="p-4 flex-row items-center"
				>
					<Feather name="log-out" size={24} color={colors.black} />
					<Typography.Label className="ml-4">Logout</Typography.Label>
				</TouchableOpacity>
			</View>
		</Wrapper>
	)
}
