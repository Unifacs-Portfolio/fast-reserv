import { Mesa } from '../../entities/Mesa'
import type { MesaRepository } from '../MesaRepository'
import { isMesa } from '../../utils/isMesa'
import { getConnection } from '../../Datenbank/configdb'
import type { Database } from 'sqlite'

export class SqliteMesaRepository implements MesaRepository {
	private db: Database
	constructor() {
		this.db = getConnection()
	}
	async findAll(): Promise<Mesa[]> {
		const mesas = await this.db.all('SELECT * FROM Mesa')
		return mesas.map((mesa) => {
			if (isMesa(mesa)) {
				return new Mesa(mesa)
			}
			throw new Error('Dados da mesa inválidos.')
		})
	}
}
