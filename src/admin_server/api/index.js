import {Router} from 'express';
import bodyParser from 'body-parser';
import Events from './Events';

const router = Router();
router.use(bodyParser.json());

router.use('/modelData/Events', Events);

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

export default router;
