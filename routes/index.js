import { Router } from 'express';
import python from './python.js';

const router = Router();

router.use('python', python);

export default router;