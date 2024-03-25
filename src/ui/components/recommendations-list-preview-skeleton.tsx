import { ScrollView, View } from 'react-native'

function Item() {
	return (
		<View className="w-[120px] gap-y-3">
			<View className="h-[170px] bg-zinc-100 rounded-2xl" />
			<View className="w-full h-4 bg-zinc-100 rounded-xl" />
			<View className="w-1/2 h-2 bg-zinc-100 rounded-xl" />
		</View>
	)
}

function List() {
	return (
		<ScrollView
			horizontal
			contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
			showsHorizontalScrollIndicator={false}
		>
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
			<Item />
		</ScrollView>
	)
}

export const RecommendationsListPreviewSkeleton = {
	List,
	Item,
}
