import type { Garcon } from '../entities/Garcon'
import type { GarconRepository } from '../repositories/GarconRepository'
interface BuscarGarconsResponse {
	garcons: {
		id: Garcon['id']
		nome: Garcon['nome']
	}[]
}

export class BuscarGarconsUseCase {
	constructor(private readonly garconRepository: GarconRepository) {}

	async execute(): Promise<BuscarGarconsResponse> {
		try {
			const garcons = await this.garconRepository.findAll()
			return {
				garcons: garcons.map((garcon) => ({
					id: garcon.id,
					nome: garcon.nome,
				})),
			}
		} catch (error) {
			throw new BuscarGarcomError()
		}
	}
}
