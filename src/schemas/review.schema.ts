import { z } from 'zod'

export const reviewSchema = z.object({
	description: z
		.string({ required_error: 'Please fill in the description field' })
		.min(1, { message: 'Please fill in the description field' })
		.max(256, {
			message: 'Please enter a description with at max 256 characters',
		}),
})

export type ReviewSchemaFields = z.infer<typeof reviewSchema>
