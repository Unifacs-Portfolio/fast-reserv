import { Router } from 'express'

import { buscarMesasController } from '../http/controllers/BuscarMesasController'

const router = Router()

router.get('/mesas', buscarMesasController)

export { router as mesasRouter }
