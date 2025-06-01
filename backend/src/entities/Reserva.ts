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
	data: string
	hora: string
	quantidadePessoas: number
	status?: StatusReserva
}
export class Reserva {
	private readonly _id: string
	private readonly _mesaId: number
	private _nomeResponsavel: string
	private _data: string
	private _hora: string
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
		this._nomeResponsavel = this.validateNome(nomeResponsavel)
		this._data = this.validateData(data)
		this._hora = this.validateHora(hora)
		this._quantidadePessoas = this.validateQuantidadePessoas(quantidadePessoas)
	}
	private validateData(data: string): string {
		const regex = /^\d{4}-\d{2}-\d{2}$/
		if (!regex.test(data)) {
			throw new Error('Data inválida. O formato deve ser AAAA-MM-DD.')
		}
		return data
	}

	private validateHora(hora: string): string {
		const regex = /^\d{2}:\d{2}$/
		if (!regex.test(hora)) {
			throw new Error('Hora invalidada, o formato deve ser HH:MM')
		}
		return hora
	}

	private validateQuantidadePessoas(quantidadePessoas: number): number {
		if (quantidadePessoas <= 0) {
			throw new Error('Quantidade de pessoas invalidas.')
		}

		if (!Number.isInteger(quantidadePessoas)) {
			throw new Error('Nao pode numeros decimais.')
		}
		return quantidadePessoas
	}

	private validateNome(nomeResponsavel: string): string {
		const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ'\-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ'\-]+)*$/
		if (!regex.test(nomeResponsavel)) {
			throw new Error(
				'Nao pode colocar numeros ou caracteres especiais em nomes.',
			)
		}
		return nomeResponsavel
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

	get data(): string {
		return this._data
	}

	get hora(): string {
		return this._hora
	}

	get quantidadePessoas(): number {
		return this._quantidadePessoas
	}

	get status(): StatusReserva {
		return this._status
	}
}
