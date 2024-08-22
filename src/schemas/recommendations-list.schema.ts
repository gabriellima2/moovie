import { z } from 'zod'

export const createRecommendationsListSchema = z.object({
	description: z
		.string({ required_error: 'Please fill in the description field' })
		.min(1, { message: 'Please fill in the description field' })
		.max(256, {
			message: 'Please enter a description with at max 256 characters',
		}),
	title: z
		.string({ required_error: 'Please fill in the title field' })
		.min(1, { message: 'Please fill in the title field' })
		.max(100, {
			message: 'Please enter a title with at max 100 characters',
		}),
})

export type CreateRecommendationsListFields = z.infer<
	typeof createRecommendationsListSchema
>
