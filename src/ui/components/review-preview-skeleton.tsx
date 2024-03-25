import { View } from 'react-native'

function Item() {
	return <View className="w-full h-[264px] bg-zinc-100 rounded-2xl mb-4" />
}

function List() {
	return (
		<>
			<Item />
			<Item />
			<Item />
		</>
	)
}

export const ReviewPreviewSkeleton = {
	List,
	Item,
}
