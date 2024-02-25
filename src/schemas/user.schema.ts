import { z } from 'zod'

export const nameSchema = z.string().min(1).max(40)

export const emailSchema = z
	.string({ required_error: 'Please fill in the email field' })
	.email({ message: 'Please enter a valid email address' })

export const passwordSchema = z
	.string({ required_error: 'Please fill in the password field' })
	.min(8, {
		message: 'Please enter a password with at least 8 characters',
	})

export const userSchema = z.object({
	name: nameSchema,
	email: emailSchema,
	password: passwordSchema,
})
