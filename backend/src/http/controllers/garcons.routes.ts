import { Router } from 'express'
import { buscarGarconsController } from './BuscarGarconsController'

const router = Router()

router.get('/garcons', buscarGarconsController)

export { router as garconsRouter }
