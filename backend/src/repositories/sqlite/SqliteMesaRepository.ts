import type { Database } from 'sqlite'
import type { MesaRepository } from '../MesaRepository'
import { getConnection } from '../../Datenbank/configdb'
import type { Mesa } from '../../entities/Mesa' 

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
	async findById(id: number): Promise<Mesa> {
			const mesa = await this.db.get('SELECT * FROM Mesa WHERE Id = ?', [
				id,
			])
			return mesa
}
}
