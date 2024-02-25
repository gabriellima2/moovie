import { z } from 'zod'
import { emailSchema, passwordSchema } from './authentication.schema'

export const nameSchema = z.string().min(1).max(40)

export const userSchema = z.object({
	name: nameSchema,
	email: emailSchema,
	password: passwordSchema,
})
