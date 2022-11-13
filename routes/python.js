import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send(req.query.code);
})

export default router;