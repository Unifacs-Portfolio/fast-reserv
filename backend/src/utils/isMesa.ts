import type { Mesa } from '../entities/Mesa'

export function isMesa(mesa: unknown): mesa is {
	id: Mesa['id']
	status: Mesa['status']
} {
	return (
		typeof mesa === 'object' &&
		mesa !== null &&
		'id' in mesa &&
		'status' in mesa &&
		typeof mesa.id === 'string' &&
		typeof mesa.status === 'string'
	)
}
