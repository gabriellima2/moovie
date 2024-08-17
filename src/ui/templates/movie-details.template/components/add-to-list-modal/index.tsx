import { TouchableOpacity, View } from 'react-native'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { Plus } from 'lucide-react-native'
import colors from 'tailwindcss/colors'

import { MoviesListOptionSkeleton } from './components/movies-list-option-skeleton'
import { MoviesListOption } from './components/movies-list-option'
import { BottomSheet } from '@/ui/components/bottom-sheet'
import { Typography } from '@/ui/atoms/typography'
import { Button } from '@/ui/components/button'

import { useGetRecommendationsListByUserId } from '@/hooks/use-get-recommendations-list-by-user-id'
import { useAuthenticationStore } from '@/store/authentication.store/authentication.store'
import { useMovieDetailsContext } from '../../contexts/movie-details.context'
import { useSelectedListOptions } from './hooks/use-selected-list-options'
import { useAddMovieToList } from './hooks/use-add-movie-to-list'

export function AddToListModal() {
	const { movieName, closeAddToListModal } = useMovieDetailsContext()
	const user = useAuthenticationStore((state) => state.user)
	const { handleAddMovieToList, isSubmitting } = useAddMovieToList(movieName)
	const { recommendationsList, isLoading, isFetching } =
		useGetRecommendationsListByUserId(user!.uid)
	const { selectedListOptions, handleSelectedListOptionsChange } =
		useSelectedListOptions()
	return (
		<BottomSheet onClose={closeAddToListModal} withoutScrollView>
			<BottomSheetFlatList
				data={recommendationsList}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<MoviesListOption
						id={item.id}
						title={item.title}
						onCheckedChange={handleSelectedListOptionsChange}
					/>
				)}
				ListEmptyComponent={() => (
					<>
						{isLoading || isFetching ? (
							<MoviesListOptionSkeleton />
						) : (
							<View className="px-4">
								<Typography.Paragraph>
									Create your first list to recommend your favorite movies
								</Typography.Paragraph>
							</View>
						)}
					</>
				)}
				contentContainerStyle={{ paddingVertical: 20 }}
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
					<View className="px-5 mt-4">
						<Button.Root
							disabled={isSubmitting}
							onPress={() => handleAddMovieToList(selectedListOptions)}
							accessibilityLabel="Confirm list selection"
						>
							{isSubmitting ? (
								<Button.Loading />
							) : (
								<Button.Label>Confirm</Button.Label>
							)}
						</Button.Root>
					</View>
				)}
			/>
		</BottomSheet>
	)
}
