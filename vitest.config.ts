import tsConfigPath from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsConfigPath()],
	test: {
		coverage: {
			include: ['backend/src/**/*.ts'],
			reporter: ['html'],
		},
	},
})
