import { Router } from 'express'
import { criarReservaController } from '../http/controllers/CriarReservaController'
import { atualizarStatusReservaController } from '../http/controllers/AtualizarStatusReservaController'
import { buscarReservasController } from '../http/controllers/BuscarReservasController'

const router = Router()

router.get('/reservas', buscarReservasController)
router.post('/reservas', criarReservaController)
router.patch('/reservas/:id', atualizarStatusReservaController)

export { router as reservasRouter }
