import { View } from 'react-native'
import { ReviewPreviewSkeleton } from '@/ui/components/review-preview-skeleton'

export function MovieDetailsSkeleton() {
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
				<View className="flex-row gap-x-2 items-center justify-between">
					<View className="flex-1 h-6 bg-zinc-200 rounded-full" />
					<View className="flex-1 h-6 bg-zinc-200 rounded-full" />
					<View className="flex-1 h-6 bg-zinc-200 rounded-full" />
				</View>
				<View>
					<View className="w-32 h-3 mb-2 bg-zinc-200 rounded-full" />
					<View className="w-32 h-3 mb-2 bg-zinc-200 rounded-full" />
				</View>
			</View>
			<View className="mt-4">
				<View className="w-2/3 h-4 bg-zinc-200 rounded-full mb-4" />
				<ReviewPreviewSkeleton.List />
			</View>
		</View>
	)
}
