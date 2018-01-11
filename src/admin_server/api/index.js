import { Router } from 'express';
import bodyParser from 'body-parser';
import Events from './Events';
import Ministries from './Ministries';

const router = Router();
router.use(bodyParser.json());

router.use('/modelData/Events', Events);
router.use('/modelData/Ministries', Ministries);

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

router.use('*', (req, res) => {
  var err = new Error('Bad Request');
  res.status(400);
  res.json({
    message: err.message,
    error: err
  });
});

export default router;
