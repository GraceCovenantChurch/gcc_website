import { Router } from 'express';
import bodyParser from 'body-parser';
import Events from './Events';
import Ministries from './Ministries';

const router = Router();
router.use(bodyParser.json());

router.use('/modelData/Events', Events);
router.use('/modelData/Ministries', Ministries);

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500);
  next();
});

router.use('*', (req, res) => {
  const err = new Error('Bad Request');
  res.status(400);
  res.json({
    message: err.message,
    error: err,
  });
});

export default router;
