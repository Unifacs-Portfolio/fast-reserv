import type { Database } from 'sqlite'
import type { GarconRepository } from '../GarconRepository'
import { Garcon } from '../../entities/Garcon'
import { isGarcom } from '../../utils/isGarcom'
import { getConnection } from '../../Datenbank/configdb'
import { isReserva } from '../../utils/isReserva'
import { Reserva } from '../../entities/Reserva'

export class SqliteGarconRepository implements GarconRepository {
	private db: Database
	constructor() {
		this.db = getConnection()
	}
	async findAll(): Promise<Garcon[]> {
		const garcons = await this.db.all('SELECT * FROM Garcon')
		return garcons.map((garcom) => {
			if (isGarcom(garcom)) {
				return new Garcon(garcom)
			}
			throw new Error('Dados do garçom inválidos.')
		})
	}
	async findById(garcomId: string): Promise<Garcon> {
		const garcom = await this.db.get('SELECT * FROM Garcon WHERE id = ?', [
			garcomId,
		])
		if (!garcom) {
			throw new Error('Garçom não encontrado.')
		}
		// falta criar um isGarcom para verificar se é garçom
		return garcom
	}
	async buscarReservasPorGarcom(verify_by: string): Promise<Reserva[]> {
		const reservas = await this.db.all(
			'SELECT * FROM Reserva WHERE verify_by = ?',
			[verify_by],
		)
		return reservas.map((reserva) => {
			if (isReserva(reserva)) {
				return new Reserva({
					id: reserva.id,
					mesaId: reserva.mesaId,
					nomeResponsavel: reserva.nomeResponsavel,
					data: reserva.data,
					hora: reserva.hora,
					quantidadePessoas: reserva.quantidadePessoas,
					status: reserva.status,
					verify_by: reserva.verify_by,
				})
			}
			throw new Error('Dados da reserva inválidos.')
		})
	}
}
