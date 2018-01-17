import { Router } from 'express';
import MinistryModel from '../../models/ministry';

const router = Router();

router.get('/', (req, res, next) => {
  MinistryModel.find({})
    .then(results => res.json(results))
    .catch(err => next(err));
});

export default router;
