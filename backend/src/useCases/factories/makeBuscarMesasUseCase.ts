import { SqliteMesaRepository } from '../../repositories/sqlite/SqliteMesaRepository'
import { BuscarMesasUseCase } from '../../useCases/BuscarMesasUseCase'

export function makeBuscarMesasUseCase() {
	const sqliteMesaRepository = new SqliteMesaRepository()
	const buscarMesasUseCase = new BuscarMesasUseCase(sqliteMesaRepository)

	return buscarMesasUseCase
}
