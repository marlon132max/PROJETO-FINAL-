import { Router } from 'express';

const router = Router();

router.get('/status', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend Histomap funcionando'
  });
});

export default router;