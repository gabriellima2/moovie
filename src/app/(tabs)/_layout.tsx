import { Redirect, Tabs } from 'expo-router'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'

export default function Layout() {
	const { user } = useAuthenticationStore()
	if (user && !user.emailVerified) return <Redirect href="/check-your-email" />
	return (
		<Tabs
			sceneContainerStyle={{
				backgroundColor: 'transparent',
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					headerShown: false,
					tabBarLabel: 'Home',
					tabBarIcon: () => (
						<Feather name="home" size={20} color={colors.black} />
					),
				}}
			/>
		</Tabs>
	)
}
