import { Database } from 'sqlite3'
import type { Reserva, StatusReserva } from '../../entities/Reserva'
import { env } from '../../env'
import type { GarcomRepository } from '../GarcomRepository'

export class SqliteGarcomRepository implements GarcomRepository {
	private db: Database
	constructor() {
		this.db = new Database(env.PATH_TO_DB, (err) => {
			if (err) {
				throw new Error(`Erro ao conectar ao banco de dados: ${err.message}`)
			}
		})
	}
	async confirmar(mesaId: number, status: StatusReserva): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run(
				'UPDATE Reserva SET status = ? WHERE mesaId = ?',
				[status, mesaId],
				(err) => {
					if (err) {
						reject(
							new Error(`Erro ao atualizar status da reserva: ${err.message}`),
						)
					} else {
						resolve()
					}
				},
			)
		})
	}
	async findByMesaId(mesaId: number): Promise<Reserva | null> {
		return new Promise((resolve, reject) => {
			this.db.get(
				'SELECT * FROM Reserva WHERE mesaId = ?',
				[mesaId],
				(err, row: Reserva | null) => {
					if (err) {
						reject(new Error(`Erro ao buscar reserva: ${err.message}`))
					} else {
						resolve(row)
					}
				},
			)
		})
	}
}
