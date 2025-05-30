import { Database } from 'sqlite3'
// biome-ignore lint/style/useImportType: <explanation>
import { Reserva, StatusReserva, ReservaRequest } from '../../entities/Reserva'
import { env } from '../../env'
import type { GarcomRepository } from '../GarcomRepository'
import { isReservaRequest } from '../../entities/types/ReservaRequest'

export class SqliteGarcomRepository implements GarcomRepository {
	private db: Database
	constructor() {
		this.db = new Database(env.PATH_TO_DB, (err) => {
			if (err) {
				throw new Error(`Erro ao conectar ao banco de dados: ${err.message}`)
			}
		})
	}
	async updateByStatus(mesaId: number, status: StatusReserva): Promise<void> {
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
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(err, row: any) => {
					if (err) {
						reject(new Error(`Erro ao buscar reserva: ${err.message}`))
					}
					if (isReservaRequest(row)) {
						resolve(new Reserva(row))
					} else {
						resolve(null)
					}
				},
			)
		})
	}
}
