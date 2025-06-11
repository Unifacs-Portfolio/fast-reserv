//Script para manipulação do Painel do Gerente

import {
	getGarcons,
	getRelatorioMesasConfirmadasPorGarcom,
	getRelatorioReservasPorMesa,
	getRelatorioReservasPorPeriodo,
} from './api.js'

document.addEventListener('DOMContentLoaded', () => {
	// Exibe ou oculta os campos conforme o tipo de relatório selecionado
	document.getElementById('reportType').addEventListener('change', function () {
		const type = this.value
		document.getElementById('commonFields').style.display =
			type === 'periodo' ? 'block' : 'none'
		document.getElementById('garcomFields').style.display =
			type === 'mesas-confirmadas-garcom' ? 'block' : 'none'
		document.getElementById('mesaFields').style.display =
			type === 'mesa' ? 'block' : 'none'
	})
	carregarGarconsNoRelatorio()
})

// Função para esconder todos os cards de relatório, mas NÃO esconde o card de geração de relatórios
function esconderTodosOsRelatorios() {
	// Card principal (tabela genérica)
	const mainTableCard = document.querySelector(
		'.card.shadow-sm:not(.mb-4):not(#mesaReportCard)',
	)
	if (mainTableCard) mainTableCard.style.display = 'none'
	// Card relatório de mesa
	const mesaCard = document.getElementById('mesaReportCard')
	if (mesaCard) mesaCard.style.display = 'none'
	// Card de geração de relatórios (NUNCA esconder)
	const gerarRelatorioCard = document.querySelector('.card.mb-4.shadow-sm')
	if (gerarRelatorioCard) gerarRelatorioCard.style.display = 'block'
}

// Switch visual entre relatórios ao trocar o tipo
const reportTypeSelect = document.getElementById('reportType')
if (reportTypeSelect) {
	reportTypeSelect.addEventListener('change', () => {
		esconderTodosOsRelatorios()
		// Limpa feedbacks/tabelas dos relatórios
		document.getElementById('reportFeedback').innerHTML = ''
		const tbody = document.querySelector('#reportTable tbody')
		if (tbody) tbody.innerHTML = ''
		document.getElementById('mesaReportFeedback').innerHTML = ''
		document.getElementById('mesaReportTableBody').innerHTML = ''
		// Remove card dinâmico de garçom se existir
		const card = document.getElementById('confirmedByWaiterCard')
		if (card) card.remove()
	})
}

// Submissão do formulário principal: só mostra o card do relatório gerado
const reportForm = document.getElementById('reportForm')
if (reportForm) {
	reportForm.addEventListener('submit', async (e) => {
		e.preventDefault()
		esconderTodosOsRelatorios()
		const reportType = document.getElementById('reportType').value
		if (reportType === 'periodo') {
			// Card principal (tabela genérica)
			const mainTableCard = document.querySelector(
				'.card.shadow-sm:not(.mb-4):not(#mesaReportCard)',
			)
			if (mainTableCard) mainTableCard.style.display = 'block'
			// Executa lógica padrão já existente
			let reservas = []
			let metricas = null
			try {
				const dataInicio = document.getElementById('startDate').value
				const dataFim = document.getElementById('endDate').value
				if (!dataInicio || !dataFim) {
					showFeedback(
						'Informe o período inicial e final para gerar o relatório.',
						'alert-danger',
					)
					return
				}
				const data = await getRelatorioReservasPorPeriodo(dataInicio, dataFim)
				if (data.metricas) {
					metricas = data.metricas
					reservas = metricas.reservas || []
				} else {
					reservas = data
				}
				atualizarTabelaRelatorio(reservas, metricas)
			} catch (error) {
				console.error('Erro ao obter relatório:', error)
				showFeedback(
					'Erro ao gerar relatório. Tente novamente.',
					'alert-danger',
				)
			}
		} else if (reportType === 'mesas-confirmadas-garcom') {
			const garcomId = document.getElementById('garcomRelatorio').value
			await exibirMesasConfirmadasPorGarcom(garcomId)
		} else if (reportType === 'mesa') {
			const mesaId = document.getElementById('mesa').value
			const mesaCard = document.getElementById('mesaReportCard')
			if (mesaCard) mesaCard.style.display = 'block'
			await exibirRelatorioReservasPorMesa(mesaId)
		}
	})
}

// Ao abrir a página, mostra apenas o card principal
window.addEventListener('DOMContentLoaded', () => {
	esconderTodosOsRelatorios()
	// Garante que o card da tabela principal fique oculto no carregamento inicial
	const mainTableCard = document.querySelector(
		'.card.shadow-sm:not(.mb-4):not(#mesaReportCard)',
	)
	if (mainTableCard) mainTableCard.style.display = 'none'
})

// Exibe mensagens de feedback para o gerente
function showFeedback(mensagem, tipo) {
	const feedbackDiv = document.getElementById('reportFeedback')
	feedbackDiv.innerHTML = `<div class="alert ${tipo}" role="alert">${mensagem}</div>`
}

// Atualiza a tabela de relatórios e exibe métricas
function atualizarTabelaRelatorio(reservas, metricas = null) {
	const metricsDivId = 'reportMetrics'
	let metricsDiv = document.getElementById(metricsDivId)
	if (!metricsDiv) {
		metricsDiv = document.createElement('div')
		metricsDiv.id = metricsDivId
		const reportTable = document.getElementById('reportTable')
		reportTable.parentNode.insertBefore(metricsDiv, reportTable)
	}

	// Exibe métricas se existirem
	if (metricas) {
		metricsDiv.innerHTML = `
			<div class="row mb-3">
				<div class="col">
					<div class="card bg-success mb-2"><div class="card-body"><strong class="text-success-emphasis" style="font-size:1.2em;">Atendidas:</strong> <span class="fw-bold text-success" style="font-size:1.3em;">${metricas.atendidas}</span></div></div>
				</div>
				<div class="col">
					<div class="card bg-danger mb-2"><div class="card-body"><strong class="text-danger-emphasis" style="font-size:1.2em;">Canceladas:</strong> <span class="fw-bold text-danger" style="font-size:1.3em;">${metricas.canceladas}</span></div></div>
				</div>
				<div class="col">
					<div class="card bg-warning mb-2"><div class="card-body"><strong class="text-warning-emphasis" style="font-size:1.2em;">Pendentes:</strong> <span class="fw-bold text-warning" style="font-size:1.3em;">${metricas.pendentes}</span></div></div>
				</div>
				<div class="col">
					<div class="card bg-dark mb-2"><div class="card-body"><strong class="text-dark" style="font-size:1.2em; color: #ffc107;">Total:</strong> <span class="fw-bold" style="font-size:1.3em; color:rgb(33,37,41);">${metricas.total}</span></div></div>
				</div>
			</div>
		`
	} else {
		metricsDiv.innerHTML = ''
	}

	const tbody = document.querySelector('#reportTable tbody')
	tbody.innerHTML = ''

	// Exibe o card da tabela principal ao gerar relatório
	const mainTableCard = document.querySelector(
		'.card.shadow-sm:not(.mb-4):not(#mesaReportCard)',
	)
	if (mainTableCard) mainTableCard.style.display = 'block'

	if (!reservas || reservas.length === 0) {
		showFeedback(
			'Nenhum dado encontrado para os parâmetros informados.',
			'alert-warning',
		)
		return
	}

	for (const r of reservas) {
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

// --- NOVO RELATÓRIO: Mesas confirmadas por garçom ---
async function carregarGarconsNoRelatorio() {
	try {
		const { garcons } = await getGarcons()
		const select = document.getElementById('garcomRelatorio')
		if (!select) return
		select.innerHTML = '<option value="" selected>Selecione o Garçom</option>'
		for (const garcom of garcons) {
			const option = document.createElement('option')
			option.value = garcom.id
			option.textContent = garcom.nome
			select.appendChild(option)
		}
	} catch (error) {
		document.getElementById('reportFeedback').innerHTML =
			`<div class="alert alert-danger">Erro ao carregar garçons.</div>`
	}
}

async function exibirMesasConfirmadasPorGarcom(garcomId) {
	// Cria dinamicamente a tabela se não existir
	let card = document.getElementById('confirmedByWaiterCard')
	if (!card) {
		card = document.createElement('div')
		card.className = 'card shadow-sm mb-4'
		card.id = 'confirmedByWaiterCard'
		card.innerHTML = `
			<div class="card-header bg-primary text-white">Mesas Confirmadas por Garçom</div>
			<div class="card-body">
				<div id="confirmedByWaiterFeedback"></div>
				<div id="confirmedByWaiterTableWrapper" style="display:none;">
					<table class="table table-bordered table-striped mt-3">
						<thead class="table-light">
							<tr>
								<th>Data</th>
								<th>Horário</th>
								<th>Mesa</th>
								<th>Nº de Pessoas</th>
								<th>Responsável</th>
							</tr>
						</thead>
						<tbody id="confirmedByWaiterTableBody"></tbody>
					</table>
				</div>
			</div>`
		document.querySelector('main.container').appendChild(card)
	}
	const feedback = document.getElementById('confirmedByWaiterFeedback')
	const tableWrapper = document.getElementById('confirmedByWaiterTableWrapper')
	const tbody = document.getElementById('confirmedByWaiterTableBody')
	if (!feedback || !tableWrapper || !tbody) return
	feedback.innerHTML = ''
	tbody.innerHTML = ''
	tableWrapper.style.display = 'none'
	if (!garcomId) {
		feedback.innerHTML =
			'<div class="alert alert-warning">Selecione um garçom.</div>'
		return
	}
	try {
		const data = await getRelatorioMesasConfirmadasPorGarcom(garcomId)
		const reservas = data.reservas || []
		if (reservas.length === 0) {
			feedback.innerHTML =
				'<div class="alert alert-info">Nenhuma mesa confirmada encontrada para este garçom.</div>'
			return
		}
		for (const r of reservas) {
			const tr = document.createElement('tr')
			tr.innerHTML = `
				<td>${r.data}</td>
				<td>${r.hora}</td>
				<td>${r.mesaId}</td>
				<td>${r.quantidadePessoas}</td>
				<td>${r.nomeResponsavel}</td>
			`
			tbody.appendChild(tr)
		}
		tableWrapper.style.display = 'block'
		feedback.innerHTML = `<div class="alert alert-success">${reservas.length} mesa(s) confirmada(s) encontradas.</div>`
	} catch (error) {
		feedback.innerHTML =
			'<div class="alert alert-danger">Erro ao buscar mesas confirmadas.</div>'
	}
}

// --- RELATÓRIO DE RESERVAS POR MESA ---
async function exibirRelatorioReservasPorMesa(mesaId) {
	const card = document.getElementById('mesaReportCard')
	const mesaNumber = document.getElementById('mesaReportNumber')
	const feedback = document.getElementById('mesaReportFeedback')
	const tableWrapper = document.getElementById('mesaReportTableWrapper')
	const tbody = document.getElementById('mesaReportTableBody')
	if (!card || !mesaNumber || !feedback || !tableWrapper || !tbody) return // Corrige erro de null
	card.style.display = 'block'
	mesaNumber.textContent = mesaId || ''
	feedback.innerHTML = ''
	tbody.innerHTML = ''
	tableWrapper.style.display = 'none'
	if (!mesaId) {
		feedback.innerHTML =
			'<div class="alert alert-warning">Selecione uma mesa.</div>'
		return
	}
	try {
		const data = await getRelatorioReservasPorMesa(mesaId)
		const reservas = data.reservas || []
		if (reservas.length === 0) {
			feedback.innerHTML =
				'<div class="alert alert-info">Nenhuma reserva encontrada para esta mesa.</div>'
			return
		}
		for (const r of reservas) {
			const tr = document.createElement('tr')
			tr.innerHTML = `
				<td>${r.data}</td>
				<td>${r.hora}</td>
				<td>${r.quantidadePessoas}</td>
				<td>${r.nomeResponsavel}</td>
				<td>${r.status}</td>
			`
			tbody.appendChild(tr)
		}
		tableWrapper.style.display = 'block'
		feedback.innerHTML = `<div class="alert alert-success">${reservas.length} reserva(s) encontrada(s) para esta mesa.</div>`
	} catch (error) {
		feedback.innerHTML =
			'<div class="alert alert-danger">Erro ao buscar reservas da mesa.</div>'
	}
}
