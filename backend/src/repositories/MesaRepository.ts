import type { Mesa } from '../entities/Mesa'

export interface MesaRepository {
	findAll(): Promise<Mesa[]>
}
