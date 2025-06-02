import { Database } from 'sqlite3'
import type { Reserva } from '../../entities/Reserva'
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
					(err) => {
						if (err) {
							reject(`Erro ao criar reserva: ${err.message}`)
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
				(err, row) => {
					if (err) {
						reject(new Error(`Erro ao buscar reserva: ${err.message}`))
					}
					if (isReserva(row)) {
						resolve(row)
					}
					reject('Dados da reserva inválidos.')
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
