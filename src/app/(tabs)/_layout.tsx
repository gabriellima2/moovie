import { BottomTabBar } from '@react-navigation/bottom-tabs'
import { Redirect, Tabs } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { BlurView } from 'expo-blur'

import { IntroductionForm } from '@/ui/components/introduction-form'
import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'

export default function Layout() {
	const { user } = useAuthenticationStore()
	if (!user) return <Redirect href="/login" />
	if (user && !user.emailVerified) return <Redirect href="/verify-your-email" />
	return (
		<>
			<Tabs
				tabBar={(props) => (
					<BlurView
						intensity={80}
						tint="light"
						className="w-[95%] max-w-[400px] h-16 rounded-2xl self-center bg-zinc-300 opacity-90 bottom-4"
					>
						<BottomTabBar {...props} />
					</BlurView>
				)}
				screenOptions={{
					tabBarShowLabel: false,
					tabBarHideOnKeyboard: true,
					tabBarStyle: {
						backgroundColor: 'transparent',
						height: '100%',
						borderTopWidth: 0,
						elevation: 0,
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
								color={focused ? '#000000' : colors.zinc[400]}
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
								color={focused ? '#000000' : colors.zinc[400]}
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
								color={focused ? '#000000' : colors.zinc[400]}
								accessibilityLabel="Profile"
							/>
						),
					}}
				/>
			</Tabs>
			<IntroductionForm />
		</>
	)
}
