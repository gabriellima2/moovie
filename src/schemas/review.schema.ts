import { z } from 'zod'

export const createReviewSchema = z.object({
	description: z
		.string({ required_error: 'Please fill in the description field' })
		.min(1, { message: 'Please fill in the description field' })
		.max(256, {
			message: 'Please enter a description with at max 256 characters',
		}),
	rating: z
		.number({ required_error: 'Please fill in the rating field' })
		.min(0, { message: 'The minimum rating is 0, please change the value' })
		.max(5, { message: 'The maximum rating is 5, please change the value' }),
})

export type CreateReviewFields = z.infer<typeof createReviewSchema>
