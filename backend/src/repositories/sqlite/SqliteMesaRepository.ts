import type { Database } from 'sqlite'
import type { MesaRepository } from '../MesaRepository'
import { getConnection } from '../../Datenbank/configdb'
import { Mesa } from '../../entities/Mesa'
import { isMesa } from '../../utils/isMesa'

export class SqliteMesaRepository implements MesaRepository {
	private db: Database
	constructor() {
		this.db = getConnection()
	}

	async updateConfirmar(id: number): Promise<void> {
		const result = await this.db.run(
			'UPDATE Mesa SET status = ? WHERE id = ?',
			['ocupada', id],
		)
		if (result.changes === 0) {
			throw new Error('Não foi possível atualizar o status da mesa.')
		}
	}
	async updateDisponibilizar(id: number): Promise<void> {
		const result = await this.db.run(
			'UPDATE Mesa SET status = ? WHERE id = ?',
			['disponivel', id],
		)
		if (result.changes === 0) {
			throw new Error(
				'Não foi possível atualizar o status da mesa para disponível.',
			)
		}
	}
	async findById(id: number): Promise<Mesa> {
		const mesa = await this.db.get('SELECT * FROM Mesa WHERE Id = ?', [id])
		return mesa
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
