import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundaryProps, Stack } from 'expo-router'
import Toast from 'react-native-toast-message'
import { StatusBar } from 'expo-status-bar'
import colors from 'tailwindcss/colors'
import {
	useFonts,
	Inter_300Light,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from '@expo-google-fonts/inter'

import { ErrorScreen } from '@/ui/components/error-screen'

import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'

import { STATUS_BAR_HEIGHT } from '@/constants/status-bar-height'
import { queryClient } from '@/lib/query-client'

export function ErrorBoundary({ error }: ErrorBoundaryProps) {
	return <ErrorScreen message={error.message} />
}

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
			<QueryClientProvider client={queryClient}>
				<BottomSheetModalProvider>
					<StatusBar style="dark" translucent />
					<SafeAreaView
						className="flex-1"
						style={{ paddingTop: Number(STATUS_BAR_HEIGHT ?? 44) }}
					>
						<Stack
							screenOptions={{
								headerShown: false,
								contentStyle: { backgroundColor: colors.white },
							}}
						/>
					</SafeAreaView>
				</BottomSheetModalProvider>
				<Toast />
			</QueryClientProvider>
		</GestureHandlerRootView>
	)
}
