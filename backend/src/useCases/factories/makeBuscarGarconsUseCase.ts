import { SqliteGarconRepository } from '../../repositories/sqlite/SqliteGarconRepository'
import { BuscarGarconsUseCase } from '../../useCases/BuscarGarconsUseCase'

export function makeBuscarGarconsUseCase() {
	const garconRepository = new SqliteGarconRepository()
	const buscarGarconsUseCase = new BuscarGarconsUseCase(garconRepository)

	return buscarGarconsUseCase
}
