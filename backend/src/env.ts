import 'dotenv/config'

export const env = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	PATH_TO_DB: process.env.PATH_TO_DB,
}
