import { Router } from 'express'
import { criarReservaController } from '../controllers/CriarReservaController'
import { atualizarStatusReservaController } from './AtualizarStatusReservaController'
import { buscarReservasController } from './BuscarReservasController'

const router = Router()

router.get('/reservas', buscarReservasController)
router.post('/reservas', criarReservaController)
router.patch('/reservas/:id', atualizarStatusReservaController)

export { router as reservasRouter }
