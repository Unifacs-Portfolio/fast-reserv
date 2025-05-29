import { SqliteGarcomRepository } from '../../repositories/sqlite/SqliteGarcomRepository'
import { ConfirmarUseCase } from '../ConfirmarReservaUseCase'

export const makeConfirmarReservaUseCase = (): ConfirmarUseCase => {
	const garcomRepository = new SqliteGarcomRepository()
	const confirmarReservaUseCase = new ConfirmarUseCase(garcomRepository)
	return confirmarReservaUseCase
}
