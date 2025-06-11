export function showFeedback(message, type) {
	const feedbackDiv = document.getElementById('reservationFeedback')
	feedbackDiv.innerHTML = `<div class="alert ${type}" role="alert">${message}</div>`
}
