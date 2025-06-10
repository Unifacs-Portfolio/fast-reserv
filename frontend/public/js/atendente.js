// Script para manipulação do Painel do Atendente

  // Importa funções do módulo da API
  import { getReservas, criarReserva, atualizarStatusReserva } from './api.js';

  document.addEventListener("DOMContentLoaded", async function () {
    // Exibe feedback ao usuário com alertas estilizados
    function showFeedback(message, type) {
      const feedbackDiv = document.getElementById("reservationFeedback");
      feedbackDiv.innerHTML = `<div class="alert ${type}" role="alert">${message}</div>`;
    }

    // Valida se a data e o horário da reserva são válidos:
    // - Não permite datas anteriores.
    // - Se a reserva for para o dia atual, o horário deve ser posterior ao horário corrente.
    function isValidReserveDateTime(dateStr, timeStr) {
      const now = new Date();
      const [year, month, day] = dateStr.split("-").map(Number);
      const [hour, minute] = timeStr.split(":").map(Number);
      const reservationDateTime = new Date(year, month - 1, day, hour, minute, 0);

      console.log("Agora:", now);
      console.log("Reserva:", reservationDateTime);

      if (reservationDateTime <= now) {
        showFeedback(
          "Não é possível fazer reservas para datas ou horários passados ou iguais ao atual",
          "alert-danger"
        );
        return false;
      }
      return true;
    }

    // Carrega as reservas com status "aguardando" e as exibe na tabela
    async function loadReservations() {
      try {
        const { reservas } = await getReservas();
        console.log("Reservas:", reservas);
        const tbody = document.querySelector("#reservationsTable tbody");
        tbody.innerHTML = ""; // Limpa a tabela

        // Filtra reservas pendentes
        const pendingReservations = reservas.filter(r => r.status === "aguardando");
        pendingReservations.forEach(r => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${r.data}</td>
            <td>${r.hora}</td>
            <td>${r.mesaId}</td>
            <td>${r.quantidadePessoas}</td>
            <td>${r.nomeResponsavel}</td>
            <td>
              <button class="btn btn-danger btn-sm" data-id="${r.id}">Cancelar</button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      } catch (error) {
        console.error("Erro ao carregar reservas:", error);
        showFeedback("Erro ao carregar reservas. Tente novamente.", "alert-danger");
      }
    }

    // Manipula o envio do formulário para criar nova reserva
    document.getElementById("reservationForm").addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const table = document.getElementById("table").value;
      const guests = document.getElementById("guests").value;

      // Valida a data e o horário da reserva
      if (!isValidReserveDateTime(date, time)) {
        return;
      }

      // Cria uma nova reserva com status "aguardando"
      const newReservation = {
        data: date,
        hora: time,
        mesaId: parseInt(table),
        quantidadePessoas: parseInt(guests),
        nomeResponsavel: name,
        status: "aguardando"
      };

      try {
        await criarReserva(newReservation);
        showFeedback("Reserva registrada com sucesso e aguardando confirmação!", "alert-success");
        // Atualiza a tabela das reservas
        await loadReservations();
        e.target.reset();
      } catch (error) {
        console.error("Erro ao salvar reserva:", error);
        showFeedback("Erro ao salvar reserva. Tente novamente.", "alert-danger");
      }
    });

    // Manipula o cancelamento da reserva; ao cancelar, o status é atualizado para "cancelada"
    document.querySelector("#reservationsTable tbody").addEventListener("click", async function (e) {
      if (e.target.tagName.toLowerCase() === "button") {
        const reservationId = e.target.getAttribute("data-id");

        try {
          await atualizarStatusReserva(reservationId, "cancelada");
          await loadReservations();
          showFeedback("Reserva cancelada com sucesso.", "alert-info");
        } catch (error) {
          console.error("Erro ao cancelar reserva:", error);
          showFeedback("Erro ao cancelar reserva. Tente novamente.", "alert-danger");
        }
      }
    });

    // Inicializa a tabela com as reservas pendentes ao carregar a página
    await loadReservations();
  });

