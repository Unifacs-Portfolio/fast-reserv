import type supertest from 'supertest'

export function checkRouteExists(
	response: supertest.Response,
	method: string,
	url: string,
): boolean {
	if (response.status === 404) {
		throw new Error(
			`Rota não existe: [${method}] ${url} - status 404 retornado`,
		)
	}
	return true
}
