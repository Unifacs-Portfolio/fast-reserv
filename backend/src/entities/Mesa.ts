export type StatusMesa = 'disponivel' | 'ocupada'

export interface MesaRequest {
	id: number
	status?: StatusMesa
}

export class Mesa {
	private readonly _id: number
	private _status: StatusMesa = 'disponivel'

	constructor({ id, status }: MesaRequest) {
		this._id = id

		if (status) {
			this._status = status
		}
	}

	get id(): number {
		return this._id
	}

	get status(): StatusMesa {
		return this._status
	}
}
