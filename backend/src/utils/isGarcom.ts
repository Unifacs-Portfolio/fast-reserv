import type { Garcon } from '../entities/Garcon'

export const isGarcom = (
	garcom: unknown,
): garcom is {
	id: Garcon['id']
	nome: Garcon['nome']
} => {
	if (typeof garcom !== 'object' || garcom === null) {
		return false
	}
	return (
		'id' in garcom &&
		'nome' in garcom &&
		typeof garcom.id === 'string' &&
		typeof garcom.nome === 'string'
	)
}
