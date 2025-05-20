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
		this.db.run(
			'INSERT INTO reservas (id, mesaId, nomeResponsavel, data, hora, quantidadePessoas, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
			[
				reserva.id,
				reserva.mesaId,
				reserva.nomeResponsavel,
				reserva.data,
				reserva.hora,
				reserva.quantidadePessoas,
				reserva.status,
			],
		)
	}

	async findByMesaId(mesaId: string): Promise<Reserva | null> {
		return new Promise((resolve, reject) => {
			this.db.get(
				'SELECT * FROM reservas WHERE mesaId = ?',
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
