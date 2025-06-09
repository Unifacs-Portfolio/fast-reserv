import { Router } from 'express'

import { buscarMesasController } from './BuscarMesasController'

const router = Router()

router.get('/mesas', buscarMesasController)

export { router as mesasRouter }
