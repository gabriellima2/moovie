import { View } from 'react-native'

import { BottomSheet } from '@/ui/components/bottom-sheet'
import { Typography } from '@/ui/atoms/typography'
import { Button } from '@/ui/components/button'
import { Field } from '@/ui/components/field'

import { useCreateRecommendationsListForm } from './hooks/use-create-recommendations-list-form'
import { useMovieDetailsContext } from '../../contexts/movie-details.context'

export function CreateListModal() {
	const { closeCreateListModal } = useMovieDetailsContext()
	const { values, errors, isSubmitting, setValue, onSubmit } =
		useCreateRecommendationsListForm()
	return (
		<BottomSheet onClose={closeCreateListModal}>
			<Typography.Title className="mb-4 text-base text-center">
				Create List
			</Typography.Title>
			<View className="flex-col items-center gap-y-3">
				<View className="w-full mb-4">
					<Field.Root>
						<Field.Label id="title">What will your list be called?</Field.Label>
						<Field.Input
							id="title"
							autoCapitalize="none"
							value={values.title}
							placeholder="Enter the list title..."
							onChangeText={(text) => setValue('title', text)}
						/>
						<Field.Error message={errors.description?.message} />
					</Field.Root>
					<Field.Root>
						<Field.Label id="description">
							Why are you recommending these movies?
						</Field.Label>
						<Field.Input
							className="items-start max-h-[256px]"
							textAlignVertical="top"
							id="description"
							autoCapitalize="none"
							numberOfLines={10}
							multiline
							value={values.description}
							placeholder="Tell us what you're thinking..."
							onChangeText={(text) => setValue('description', text)}
						/>
						<Field.Error message={errors.description?.message} />
					</Field.Root>
				</View>
				<Button.Root
					onPress={onSubmit}
					disabled={isSubmitting}
					accessibilityLabel="Create list"
				>
					{isSubmitting ? (
						<Button.Loading />
					) : (
						<Button.Label>Create</Button.Label>
					)}
				</Button.Root>
			</View>
		</BottomSheet>
	)
}
