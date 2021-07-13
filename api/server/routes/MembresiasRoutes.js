import { Router } from 'express';
import MembresiaController from '../controllers/MembresiaController';

const router = Router();
router.post('/', MembresiaController.add);
router.get('/:id', MembresiaController.getItem);
router.get('/detalle/:page/:num/:id', MembresiaController.getDetalle);
router.get('/listadetalle/:page/:num/:id',MembresiaController.listadetalle)
router.delete('/:id', MembresiaController.delete);
export default router;
