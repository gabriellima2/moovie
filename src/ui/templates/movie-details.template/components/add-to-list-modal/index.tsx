import { useState } from 'react'
import { TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { Check, Plus } from 'lucide-react-native'
import colors from 'tailwindcss/colors'

import { BottomSheet } from '@/ui/components/bottom-sheet'
import { Typography } from '@/ui/atoms/typography'

import { useGetRecommendationsListByUserId } from '@/hooks/use-get-recommendations-list-by-user-id'
import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { useMovieDetailsContext } from '../../contexts/movie-details.context'

import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { cn } from '@/helpers/cn'

type RecommendationsListOptionProps = {
	title: string
}

function RecommendationsListOption(props: RecommendationsListOptionProps) {
	const { title } = props
	const [isChecked, setIsChecked] = useState(false)
	return (
		<TouchableHighlight
			underlayColor={colors.zinc[100]}
			onPress={() => setIsChecked((prevState) => !prevState)}
			className="flex-1 p-5"
		>
			<View className="flex-row items-center justify-start">
				<View
					className={cn(
						'border border-zinc-400 w-5 h-5 items-center justify-center rounded-md',
						{
							'bg-black border-0': isChecked,
						}
					)}
				>
					{isChecked && <Check color={colors.white} size={16} />}
				</View>

				<Typography.Subtitle className="text-base ml-3">
					{title}
				</Typography.Subtitle>
			</View>
		</TouchableHighlight>
	)
}

export function AddToListModal() {
	const { closeAddToListModal } = useMovieDetailsContext()
	const user = useAuthenticationStore((state) => state.user)
	const { recommendationsList } = useGetRecommendationsListByUserId(user!.uid)
	return (
		<BottomSheet onClose={closeAddToListModal} withoutScrollView>
			<BottomSheetFlatList
				data={recommendationsList}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<RecommendationsListOption title={item.title} />
				)}
				contentContainerStyle={{ paddingTop: 20 }}
				ListHeaderComponent={() => (
					<View className="mb-4 flex-row justify-between px-5">
						<Typography.Title className="text-base">
							Add movie to...
						</Typography.Title>
						<TouchableOpacity
							activeOpacity={0.8}
							className="flex-row items-center"
						>
							<Plus size={20} color={colors.black} />
							<Typography.Label className="ml-2">New list</Typography.Label>
						</TouchableOpacity>
					</View>
				)}
				ListFooterComponent={() => (
					<TouchableOpacity
						activeOpacity={0.8}
						className="py-5 items-center justify-center"
					>
						<Typography.Label>Confirm</Typography.Label>
					</TouchableOpacity>
				)}
			/>
		</BottomSheet>
	)
}
