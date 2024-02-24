import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { Stack } from 'expo-router'
import {
	useFonts,
	Inter_300Light,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from '@expo-google-fonts/inter'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { STATUS_BAR_HEIGHT } from '@/constants/status-bar-height'

export default function Layout() {
	const { authStateHasBeenChecked } = useAuthenticationStore()
	const [fontsLoaded] = useFonts({
		Inter_600SemiBold,
		Inter_500Medium,
		Inter_400Regular,
		Inter_300Light,
		Inter_700Bold,
	})

	if (!fontsLoaded && !authStateHasBeenChecked) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator />
			</View>
		)
	}

	return (
		<GestureHandlerRootView className="flex-1">
			<SafeAreaView
				className="flex-1"
				style={{ paddingTop: Number(STATUS_BAR_HEIGHT ?? 44) }}
			>
				<Stack screenOptions={{ headerShown: false }} />
			</SafeAreaView>
			<Toast />
		</GestureHandlerRootView>
	)
}
