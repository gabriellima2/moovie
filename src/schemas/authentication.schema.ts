import { z } from 'zod'

export const authenticationSchema = z.object({
	email: z
		.string({ required_error: 'Please fill in the email field' })
		.email({ message: 'Please enter a valid email address' }),
	password: z
		.string({ required_error: 'Please fill in the password field' })
		.min(8, {
			message: 'Please enter a password with at least 8 characters',
		}),
})
