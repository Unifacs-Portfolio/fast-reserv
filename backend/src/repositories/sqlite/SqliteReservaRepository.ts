import { Database } from 'sqlite3'
import type { Reserva } from '../../entities/Reserva'
import { env } from '../../env'
import type { ReservaRepository } from '../ReservaRepository'

export class SqliteReservaRepository implements ReservaRepository {
	private db: Database
	constructor() {
		this.db = new Database(env.PATH_TO_DB, (err) => {
			if (err) {
				throw new Error(`Erro ao conectar ao banco de dados: ${err.message}`)
			}
		})
	}
	async create(reserva: Reserva): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.db.run(
				'INSERT INTO Reserva (id, mesaId, nomeResponsavel, data, hora, quantidadePessoas, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
				[
					reserva.id,
					reserva.mesaId,
					reserva.nomeResponsavel,
					reserva.data,
					reserva.hora,
					reserva.quantidadePessoas,
					reserva.status,
				],
				(err: Error | null) => {
					if (err) {
						reject(new Error(`Erro ao criar reserva: ${err.message}`))
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

	async delete(mesaId: number): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run(
				'DELETE FROM Reserva WHERE mesaId = ?',
				[mesaId],
				(err: Error | null) => {
					if (err) {
						reject(new Error(`Erro ao deletar reserva: ${err.message}`))
					} else {
						console.log('Reserva deletada')
						resolve()
					}
				},
			)
		})
	}
}
