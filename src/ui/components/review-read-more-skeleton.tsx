import { View } from 'react-native'

export function ReviewReadMoreSkeleton() {
	return (
		<View className="px-4 mt-4">
			<View
				style={{
					width: '100%',
					height: undefined,
					aspectRatio: 4 / 4,
				}}
				className="rounded-2xl bg-zinc-200 mb-4"
			/>
			<View className="gap-y-4 mb-4">
				<View className="w-2/3 h-4 bg-zinc-200 rounded-full" />
				<View>
					<View className="w-full h-3 mb-2 bg-zinc-200 rounded-full" />
					<View className="w-full h-3 mb-2 bg-zinc-200 rounded-full" />
					<View className="w-full h-3 mb-2 bg-zinc-200 rounded-full" />
					<View className="w-full h-3 mb-2 bg-zinc-200 rounded-full" />
					<View className="w-full h-3 bg-zinc-200 rounded-full" />
				</View>
				<View className="flex-row gap-x-2 items-center">
					<View className="w-8 h-8 bg-zinc-200 rounded-full" />
					<View className="w-16 h-3 mb-2 bg-zinc-200 rounded-full" />
				</View>
			</View>
		</View>
	)
}
