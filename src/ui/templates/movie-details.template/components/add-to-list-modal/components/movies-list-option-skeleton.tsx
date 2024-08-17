import { View } from 'react-native'

export function MoviesListOptionSkeleton() {
	return (
		<View className="px-4">
			<View className="w-[75%] h-4 mb-4 bg-zinc-200 rounded-full" />
			<View className="w-[65%] h-4 mb-4 bg-zinc-200 rounded-full" />
			<View className="w-[65%] h-4 mb-4 bg-zinc-200 rounded-full" />
			<View className="w-[85%] h-4 mb-4 bg-zinc-200 rounded-full" />
		</View>
	)
}
