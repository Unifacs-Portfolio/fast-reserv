export async function getReservas() {
	const response = await fetch('/api/reservas')
	return response.json()
}
export async function criarReserva(reserva) {
	const response = await fetch('/api/reservas', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(reserva),
	})
	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error)
	}
	return response.json()
}

export async function atualizarStatusReserva(id, status, garcomId) {
	const response = await fetch(`/api/reservas/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ status, garcomId }),
	})
	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error)
	}
	return response.json()
}

export async function getMesas() {
	const response = await fetch('/api/mesas')
	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error)
	}
	return response.json()
}

export async function getGarcons() {
	const response = await fetch('/api/garcons')
	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error)
	}
	return response.json()
}

export async function getRelatorioReservasPorPeriodo(dataInicio, dataFim) {
	const response = await fetch(
		`/api/relatorios/reservas-atendidas?dataInicio=${dataInicio}&dataFim=${dataFim}`,
	)
	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error)
	}
	return response.json()
}

export async function getRelatorioReservasPorMesa(mesaId) {
	const response = await fetch(`/api/relatorios/reservas-mesa/${mesaId}`)
	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error)
	}
	return response.json()
}

export async function getRelatorioMesasConfirmadasPorGarcom(garcomId) {
	const response = await fetch(
		`/api/relatorios/mesas-confirmadas/?garcomId=${garcomId}`,
	)
	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error)
	}
	return response.json()
}
