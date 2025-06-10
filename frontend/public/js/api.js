const BASE_URL = '/api';
export async function getReservas() {
    const response = await fetch (`${BASE_URL}/reservas`);
    return response.json();
    
}
export async function criarReserva(reserva) {
    const response = await fetch (`${BASE_URL}/reservas`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(reserva)
    });
    return response.json();
}

export async function atualizarStatusReserva(id, status) {
    const response = await fetch (`${BASE_URL}/reservas/${id}`,{
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
       body: JSON.stringify({status})
    });
    return response.json();
}

export async function getMesas() {
    const response = await fetch(`${BASE_URL}/mesas`);
    return response.json();
}

export async function getGarcons() {
    const response = await fetch(`${BASE_URL}/garcons`);
    return response.json();
}

export async function getRelatorioReservasPorPeriodo() {
    const response = await fetch(`${BASE_URL}/relatorios/reservas-atendidas`);
    return response.json();
}

export async function getRelatorioReservasPorMesa(mesaId) {
    const response = await fetch(`${BASE_URL}/relatorios/reservas-mesa/${mesaId}`);
    return response.json();
}

export async function getRelatorioReservasPorGarcom() {
    const response = await fetch(`${BASE_URL}/relatorios/mesas-confirmadas`);
    return response.json();
}