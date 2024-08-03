import { View } from 'react-native'

import { BottomSheet } from '@/ui/components/bottom-sheet'
import { Typography } from '@/ui/atoms/typography'
import { Button } from '@/ui/components/button'
import { Field } from '@/ui/components/field'

import { useMovieDetailsContext } from '../../contexts/movie-details.context'
import { useCreateReviewForm } from './hooks/use-create-review-form'

export function CreateReviewModal() {
	const { closeCreateReviewModal } = useMovieDetailsContext()
	const { errors, isSubmitting, setValue, onSubmit } = useCreateReviewForm()
	return (
		<BottomSheet onClose={closeCreateReviewModal}>
			<Typography.Title className="mb-4 text-base text-center">
				Create Review
			</Typography.Title>
			<View className="flex-col items-center gap-y-3">
				<Field.Root>
					<Field.Label id="description">
						What did you think of the movie?
					</Field.Label>
					<Field.Input
						className="items-start max-h-[256px]"
						textAlignVertical="top"
						id="description"
						autoCapitalize="none"
						numberOfLines={10}
						multiline
						placeholder="Tell us what you thought of the movie..."
						onChangeText={(text) => setValue('description', text)}
					/>
					<Field.Error message={errors.description?.message} />
				</Field.Root>
				<Button.Root
					onPress={onSubmit}
					disabled={isSubmitting}
					accessibilityLabel="Create review"
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
