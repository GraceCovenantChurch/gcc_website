import {Router} from 'express';

const router = Router();

router.get('/pages/:page', (req, res) => {
  res.json({
    title: req.params.page,
    content: `You requested page ${req.params.page}`,
  });
});

export default router;
