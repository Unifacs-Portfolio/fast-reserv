// Script para manipulação do Painel do Atendente

// Importa funções do módulo da API
import {
	atualizarStatusReserva,
	criarReserva,
	getMesas,
	getReservas,
} from './api.js'
import { showFeedback } from './utils.js'

// Valida se a data e o horário da reserva são válidos:
// - Não permite datas anteriores.
// - Se a reserva for para o dia atual, o horário deve ser posterior ao horário corrente.
function isValidReserveDateTime(dateStr, timeStr) {
	const now = new Date()
	const [year, month, day] = dateStr.split('-').map(Number)
	const [hour, minute] = timeStr.split(':').map(Number)
	const reservationDateTime = new Date(year, month - 1, day, hour, minute, 0)

	console.log('Agora:', now)
	console.log('Reserva:', reservationDateTime)

	if (reservationDateTime <= now) {
		showFeedback(
			'Não é possível fazer reservas para datas ou horários anteriores ou iguais ao atual',
			'alert-danger',
		)
		return false
	}
	return true
}

// Carrega as reservas com status "aguardando" e as exibe na tabela
async function loadReservations() {
	try {
		const { reservas } = await getReservas()
		const tbody = document.querySelector('#reservationsTable tbody')
		tbody.innerHTML = ''

		// Filtra reservas pendentes
		const pendingReservations = reservas.filter(
			(r) => r.status === 'aguardando',
		)
		for (const pendingReservation of pendingReservations) {
			const tr = document.createElement('tr')
			tr.innerHTML = `
            <td>${pendingReservation.data}</td>
            <td>${pendingReservation.hora}</td>
            <td>${pendingReservation.mesaId}</td>
            <td>${pendingReservation.quantidadePessoas}</td>
            <td>${pendingReservation.nomeResponsavel}</td>
            <td>
              <button class="btn btn-danger btn-sm" data-id="${pendingReservation.id}">Cancelar</button>
            </td>
          `
			tbody.appendChild(tr)
		}
	} catch (error) {
		console.error('Erro ao carregar reservas:', error)
		showFeedback('Erro ao carregar reservas. Tente novamente.', 'alert-danger')
	}
}

// Função para popular o select de mesas dinamicamente
async function popularSelectMesas() {
	try {
		const { mesas } = await getMesas()
		const selectMesa = document.getElementById('table')
		// Remove todas as opções exceto o placeholder
		selectMesa.innerHTML =
			'<option value="" disabled selected>Selecione a Mesa</option>'
		for (const mesa of mesas) {
			const option = document.createElement('option')
			option.value = mesa.id
			option.textContent = `Mesa ${mesa.id}`
			selectMesa.appendChild(option)
		}
	} catch (error) {
		console.error('Erro ao carregar mesas:', error)
		showFeedback('Erro ao carregar mesas. Tente novamente.', 'alert-danger')
	}
}

// Manipula o envio do formulário para criar nova reserva
document
	.getElementById('reservationForm')
	.addEventListener('submit', async (e) => {
		e.preventDefault()

		const name = document.getElementById('name').value
		const date = document.getElementById('date').value
		const time = document.getElementById('time').value
		const table = document.getElementById('table').value
		const guests = document.getElementById('guests').value

		// Valida a data e o horário da reserva
		if (!isValidReserveDateTime(date, time)) {
			return
		}

		// Cria uma nova reserva com status "aguardando"
		const newReservation = {
			data: date,
			hora: time,
			mesaId: Number.parseInt(table),
			quantidadePessoas: Number.parseInt(guests),
			nomeResponsavel: name,
		}

		try {
			await criarReserva(newReservation)
			showFeedback(
				'Reserva registrada com sucesso e aguardando confirmação!',
				'alert-success',
			)
			// Atualiza a tabela das reservas
			await loadReservations()
			e.target.reset()
		} catch (error) {
			showFeedback(error.message, 'alert-danger')
		}
	})

// Manipula o cancelamento da reserva; ao cancelar, o status é atualizado para "cancelada"
document
	.querySelector('#reservationsTable tbody')
	.addEventListener('click', async (e) => {
		if (e.target.tagName.toLowerCase() === 'button') {
			const reservationId = e.target.getAttribute('data-id')

			try {
				await atualizarStatusReserva(reservationId, 'cancelada')
				await loadReservations()
				showFeedback('Reserva cancelada com sucesso.', 'alert-info')
			} catch (error) {
				console.error('Erro ao cancelar reserva:', error)
				showFeedback(
					'Erro ao cancelar reserva. Tente novamente.',
					'alert-danger',
				)
			}
		}
	})

// Inicializa a tabela com as reservas pendentes e o select de mesas ao carregar a página
await Promise.all([popularSelectMesas(), loadReservations()])
