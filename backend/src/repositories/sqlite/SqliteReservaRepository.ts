import { Database } from 'sqlite3'
import { Reserva } from '../../entities/Reserva'
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
						reject(new Error(`Erro ao criar reserva: ${err.message}`))
						return
					}
					this.db.get(
						'SELECT * FROM Reserva WHERE id = ?',
						[reserva.id],
						(err, row) => {
							if (err) {
								reject(new Error(`Erro ao buscar reserva: ${err.message}`))
								return
							}
							if (!row) {
								reject(new Error('Reserva não encontrada após inserção.'))
								return
							}
							if (isReserva(row)) {
								resolve(
									new Reserva({
										id: row.id,
										mesaId: row.mesaId,
										nomeResponsavel: row.nomeResponsavel,
										data: row.data,
										hora: row.hora,
										quantidadePessoas: row.quantidadePessoas,
										status: row.status,
										verify_by: row.verify_by,
									}),
								)
								return
							}
							reject(new Error('Dados da reserva inválidos.'))
						},
					)
				},
			)
		})
	}

	async findByMesaId(mesaId: number): Promise<Reserva | null> {
		return new Promise((resolve, reject) => {
			this.db.get(
				'SELECT * FROM Reserva WHERE mesaId = ?',
				[mesaId],
				(err, row) => {
					if (err) {
						reject(new Error(`Erro ao buscar reserva: ${err.message}`))
						return
					}
					if (!row) {
						resolve(null)
						return
					}
					if (isReserva(row)) {
						resolve(
							new Reserva({
								id: row.id,
								mesaId: row.mesaId,
								nomeResponsavel: row.nomeResponsavel,
								data: row.data,
								hora: row.hora,
								quantidadePessoas: row.quantidadePessoas,
								status: row.status,
								verify_by: row.verify_by,
							}),
						)
						return
					}
					reject(new Error('Dados da reserva inválidos.'))
				},
			)
		})
	}

	async delete(mesaId: number): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run('DELETE FROM Reserva WHERE mesaId = ?', [mesaId], (err) => {
				if (err) {
					reject(new Error(`Erro ao deletar reserva: ${err.message}`))
				} else {
					resolve()
				}
			})
		})
	}
}
