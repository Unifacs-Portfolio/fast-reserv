import type { Mesa } from '../entities/Mesa'

export interface MesaRepository {
	updateConfirmar(id: number): Promise<void>
	updateDisponibilizar(id: number): Promise<void>
	findById(id: number): Promise<Mesa>
	findAll(): Promise<Mesa[]>
}
