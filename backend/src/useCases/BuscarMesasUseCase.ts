import type { Mesa } from '../entities/Mesa'
import type { MesaRepository } from '../repositories/MesaRepository'
interface BuscarMesasResponse {
	mesas: {
		id: Mesa['id']
		status: Mesa['status']
	}[]
}

export class BuscarMesasUseCase {
	constructor(private readonly mesaRepository: MesaRepository) {}

	async execute(): Promise<BuscarMesasResponse> {
		const mesas = await this.mesaRepository.findAll()
		return {
			mesas: mesas.map((mesa) => ({
				id: mesa.id,
				status: mesa.status,
			})),
		}
	}
}
