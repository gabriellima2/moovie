import { z } from 'zod'
import { emailSchema, passwordSchema } from './user.schema'

export const authenticationSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
})
