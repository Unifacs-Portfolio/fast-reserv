// regras de dominio
/**
 * Restrições e comportamentos inerentes ao modelo do
 * Exemplo: quantidade de pessoas não pode ser não positivo
 * (uma regra que garante integridade da entidade Reserva)
 */

export type StatusReserva = 'aguardando' | 'confirmada' | 'cancelada'

interface ReservaRequest {
	id: string
	mesaId: number
	nomeResponsavel: string
	data: Date
	hora: Date
	quantidadePessoas: number
	status?: StatusReserva
}
export class Reserva {
	private readonly _id: string
	private readonly _mesaId: number
	private _nomeResponsavel: string
	private _data: Date
	private _hora: Date
	private _quantidadePessoas: number
	private _status: StatusReserva = 'aguardando'

	constructor({
		id,
		mesaId,
		nomeResponsavel,
		data,
		hora,
		quantidadePessoas,
		status,
	}: ReservaRequest) {
		if (quantidadePessoas <= 0) {
			throw new Error('Quantidade de pessoas deve ser maior que zero')
		}

		if (status) {
			this._status = status
		}

		// Outras validações podem ser adicionadas aqui,
		// podem ser criados metodos para isso
		this._id = id
		this._mesaId = mesaId
		this._nomeResponsavel = nomeResponsavel
		this._data = data
		this._hora = hora
		this._quantidadePessoas = quantidadePessoas
	}

	get id(): string {
		return this._id
	}

	get mesaId(): number {
		return this._mesaId
	}

	get nomeResponsavel(): string {
		return this._nomeResponsavel
	}

	get data(): Date {
		return this._data
	}

	get hora(): Date {
		return this._hora
	}

	get quantidadePessoas(): number {
		return this._quantidadePessoas
	}

	get status(): StatusReserva {
		return this._status
	}
}
