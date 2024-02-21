import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { Slot } from 'expo-router'
import {
	useFonts,
	Inter_300Light,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from '@expo-google-fonts/inter'

import { STATUS_BAR_HEIGHT } from '@/constants/status-bar-height'

export default function Layout() {
	const [fontsLoaded] = useFonts({
		Inter_600SemiBold,
		Inter_500Medium,
		Inter_400Regular,
		Inter_300Light,
		Inter_700Bold,
	})

	if (!fontsLoaded) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator />
			</View>
		)
	}

	return (
		<SafeAreaView
			className="flex-1"
			style={{ paddingTop: Number(STATUS_BAR_HEIGHT ?? 44) }}
		>
			<Slot />
		</SafeAreaView>
	)
}
