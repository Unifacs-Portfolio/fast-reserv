//Script para manipulação do Painel do Gerente

import {
	getRelatorioReservasPorGarcom,
	getRelatorioReservasPorMesa,
	getRelatorioReservasPorPeriodo,
} from 'js/api.js'

document.addEventListener('DOMContentLoaded', () => {
	// Exibe ou oculta os campos conforme o tipo de relatório selecionado
	document.getElementById('reportType').addEventListener('change', function () {
		const type = this.value
		document.getElementById('commonFields').style.display =
			type === 'periodo' ? 'block' : 'none'
		document.getElementById('garcomFields').style.display =
			type === 'garçom' ? 'block' : 'none'
		document.getElementById('mesaFields').style.display =
			type === 'mesa' ? 'block' : 'none'
	})
})

// Manipula a submissão do formulário para geração do relatório
document.getElementById('reportForm').addEventListener('submit', async (e) => {
	e.preventDefault()
	const reportType = document.getElementById('reportType').value
	let reservas = []

	try {
		if (reportType === 'periodo') {
			reservas = await getRelatorioReservasPorPeriodo()
		} else if (reportType === 'garçom') {
			const garcomId = document.getElementById('garcom').value
			if (!garcomId) {
				showFeedback(
					'Selecione um garçom para gerar o relatório.',
					'alert-danger',
				)
				return
			}
			reservas = await getRelatorioReservasPorGarcom()
			reservas = reservas.filter((r) => r.garcomId === garcomId)
		} else if (reportType === 'mesa') {
			const mesaId = document.getElementById('mesa').value
			if (!mesaId) {
				showFeedback(
					'Selecione uma mesa para gerar o relatório.',
					'alert-danger',
				)
				return
			}
			reservas = await getRelatorioReservasPorMesa(mesaId)
		}

		atualizarTabelaRelatorio(reservas)
	} catch (error) {
		console.error('Erro ao obter relatório:', error)
		showFeedback('Erro ao gerar relatório. Tente novamente.', 'alert-danger')
	}
})

// Exibe mensagens de feedback para o gerente
function showFeedback(mensagem, tipo) {
	const feedbackDiv = document.getElementById('reportFeedback')
	feedbackDiv.innerHTML = `<div class="alert ${tipo}" role="alert">${mensagem}</div>`
}

// Atualiza a tabela de relatórios
function atualizarTabelaRelatorio(reservas) {
	const tbody = document.querySelector('#reportTable tbody')
	tbody.innerHTML = ''

	if (reservas.length === 0) {
		showFeedback(
			'Nenhum dado encontrado para os parâmetros informados.',
			'alert-warning',
		)
		return
	}

	for (const reserva of reservas) {
		const tr = document.createElement('tr')
		tr.innerHTML = `
          <td>${r.data}</td>
          <td>${r.hora}</td>
          <td>${r.mesaId}</td>
          <td>${r.quantidadePessoas}</td>
          <td>${r.nomeResponsavel}</td>
          <td>${r.status}</td>
        `
		tbody.appendChild(tr)
	}

	// Adiciona linha de resumo do total de reservas
	const summaryTr = document.createElement('tr')
	summaryTr.innerHTML = `<td colspan="5"><strong>Total de Reservas</strong></td><td><strong>${reservas.length}</strong></td>`
	tbody.appendChild(summaryTr)
	showFeedback('Relatório gerado com sucesso!', 'alert-success')
}
