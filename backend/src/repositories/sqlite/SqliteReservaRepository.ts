import { Database } from 'sqlite3'
import type { Reserva, StatusReserva } from '../../entities/Reserva'
import { env } from '../../env'
import { isReserva } from '../../utils/isReserva'
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
	async create(reserva: Reserva): Promise<Reserva> {
		return new Promise((resolve, reject) => {
			this.db.serialize(() => {
				this.db.run(
					'INSERT INTO Reserva (id, mesaId, nomeResponsavel, data, hora, quantidadePessoas, status, verify_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
					[
						reserva.id,
						reserva.mesaId,
						reserva.nomeResponsavel,
						reserva.data,
						reserva.hora,
						reserva.quantidadePessoas,
						reserva.status,
						reserva.verify_by,
					],
					(err) => {
						if (err) {
							reject(`Erro ao criar reserva: ${err.message}`)
							console.log('Erro ao criar reserva')
						}
					},
				)
				this.db.get(
					'SELECT * FROM Reserva WHERE id = ?',
					[reserva.id],
					(err, row) => {
						if (err) {
							reject(`Erro ao buscar reserva: ${err.message}`)
						}
						if (!row) {
							reject('Reserva não encontrada após inserção.')
						}

						if (isReserva(row)) {
							resolve(row)
						}
						reject('Dados da reserva inválidos.')
					},
				)
			})
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

	async findById(id: string): Promise<Reserva | null> {
		return new Promise((resolve, reject) => {
			this.db.get(
				'SELECT * FROM Reserva WHERE Id = ?',
				[id],
				(err, row: Reserva) => {
					if (err) {
						reject(new Error(`Erro ao buscar reserva: ${err.message}`))
					} else {
						resolve(row)
					}
				},
			)
		})
	}

	async update(id: string, reserva: Reserva): Promise<Reserva> {
		const updates: string[] = []
		const values: (string | null)[] = []

		if (reserva.status !== undefined) {
			updates.push('status = ?')
			values.push(reserva.status)
		}

		if (reserva.verify_by !== undefined) {
			updates.push('verify_by = ?')
			values.push(reserva.verify_by)
		}

		if (updates.length === 0) {
			throw new Error('Nenhum campo fornecido para atualização.')
		}

		values.push(id) // id da reserva

		const sql = `UPDATE Reserva SET ${updates.join(', ')} WHERE id = ?`

		await new Promise<void>((resolve, reject) => {
			this.db.run(sql, values, (err) => {
				if (err) {
					reject(err)
				} else {
					resolve()
				}
			})
		})
		return reserva
	}
}
