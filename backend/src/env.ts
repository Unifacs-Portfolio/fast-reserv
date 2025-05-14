import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production']),
	PORT: z.coerce.number().default(3000),
	PATH_TO_DB: z.string(),
})

const { success, data, error } = envSchema.safeParse(process.env)

if (!success) {
	console.error('Invalid environment variables:', error.format())
	throw new Error('Invalid environment variables')
}

export const env = data
