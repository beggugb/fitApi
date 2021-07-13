import { Router } from 'express';
import InformesController from '../controllers/InformesController';

const router = Router();
router.post('/clientes',InformesController.clientes)
router.post('/membresias',InformesController.membresias)
router.post('/cajas',InformesController.cajas)
router.post('/pagos',InformesController.pagos)
router.post('/consolidado',InformesController.consolidado)
router.post('/registro',InformesController.registro)
export default router;
