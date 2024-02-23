import { Redirect, Tabs } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'

export default function Layout() {
	const { user } = useAuthenticationStore()
	if (!user) return <Redirect href="/login" />
	if (user && !user.emailVerified) return <Redirect href="/verify-your-email" />
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: {
					height: 56,
					borderTopWidth: 1,
					borderColor: colors.zinc[200],
					backgroundColor: colors.white,
					elevation: 0, // for Android
					shadowOffset: {
						width: 0,
						height: 0,
					},
				},
			}}
			sceneContainerStyle={{
				backgroundColor: colors.white,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<Feather
							name="home"
							size={20}
							color={focused ? colors.black : colors.zinc[400]}
							accessibilityLabel="Home"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<Feather
							name="film"
							size={20}
							color={focused ? colors.black : colors.zinc[400]}
							accessibilityLabel="Explore"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<Feather
							name="user"
							size={20}
							color={focused ? colors.black : colors.zinc[400]}
							accessibilityLabel="Profile"
						/>
					),
				}}
			/>
		</Tabs>
	)
}
