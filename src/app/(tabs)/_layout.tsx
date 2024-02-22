import { Tabs } from 'expo-router'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'

export default function Layout() {
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
