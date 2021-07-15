import { Router } from 'express';
import InformesController from '../controllers/InformesController';

const router = Router();
router.post('/clientes',InformesController.clientes)
router.post('/membresias',InformesController.membresias)
router.post('/cajas',InformesController.cajas)
router.post('/pagos',InformesController.pagos)
router.post('/consolidado',InformesController.consolidado)
router.post('/registro',InformesController.registro)
router.get('/indexar/:inicio/:fin',InformesController.indexar)

router.post('/amembresias',InformesController.amembresias)
router.post('/aconsolidado',InformesController.aconsolidado)

export default router;
