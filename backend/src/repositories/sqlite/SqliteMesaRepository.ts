import type { Database } from 'sqlite'
import type { MesaRepository } from '../MesaRepository'
import { getConnection } from '../../Datenbank/configdb'

export class SqliteMesaRepository implements MesaRepository {
	private db: Database
	constructor() {
		this.db = getConnection()
	}

	async updateConfirmar(id: number): Promise<void> {
		const result = await this.db.run(
			'UPDATE Mesa SET status = ? WHERE id = ?',
			['Ocupada', id],
		)
		console.log(result)
		if (result.changes === 0) {
			throw new Error('Não foi possível atualizar o status da mesa.')
		}
	}
	async updateDisponibilizar(id: number): Promise<void> {
		const result = await this.db.run(
			'UPDATE Mesa SET status = ? WHERE id = ?',
			['Reservavel', id],
		)
		if (result.changes === 0) {
			throw new Error('Dados da reserva inválidos.')
		}
	}
}
