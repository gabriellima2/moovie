import { View } from 'react-native'

import { BottomSheet } from '@/ui/components/bottom-sheet'
import { Typography } from '@/ui/atoms/typography'
import { Button } from '@/ui/components/button'
import { Field } from '@/ui/components/field'

import { useMovieDetailsContext } from '../../contexts/movie-details.context/hooks/use-movie-details-context'
import { useCreateReviewForm } from './hooks/use-create-review-form'
import { Rating } from '@/ui/components/rating'

export function CreateReviewModal() {
	const { closeCreateReviewModal } = useMovieDetailsContext()
	const { values, errors, isSubmitting, setValue, onSubmit } =
		useCreateReviewForm()
	return (
		<BottomSheet onClose={closeCreateReviewModal}>
			<Typography.Title className="mb-4 text-base text-center">
				Create Review
			</Typography.Title>
			<View className="flex-col items-center gap-y-3">
				<View className="w-full mb-4">
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
							value={values.description}
							placeholder="Tell us what you thought of the movie..."
							onChangeText={(text) => setValue('description', text)}
						/>
						<Field.Error message={errors.description?.message} />
					</Field.Root>
					<Field.Root className="items-start">
						<Field.Label id="rating">
							How much did you like this movie?
						</Field.Label>
						<View id="rating" className="mt-2">
							<Rating
								value={values.rating}
								onFinishRating={(rating) => setValue('rating', rating)}
							/>
						</View>
						<Field.Error message={errors.rating?.message} />
					</Field.Root>
				</View>
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
