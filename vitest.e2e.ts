import { mergeConfig, defineConfig } from 'vitest/config'
import vitestConfig from './vitest.config'
export default mergeConfig(
	vitestConfig,
	defineConfig({
		test: {
			include: ['backend/src/http/controllers/**/*.{test,spec}.ts'],
		},
	}),
)
