import {Router} from 'express';
import bodyParser from 'body-parser';
import Announcements from './Announcements';

const router = Router();
router.use(bodyParser.json());

router.use('/modelData/Announcements', Announcements);

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

export default router;
