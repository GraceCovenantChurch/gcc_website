import { Router } from 'express';
import EventModel from '../../models/event';

const router = Router();

router.get('/', (req, res, next) => {
  EventModel.find({
  	published: true
  }).sort({
  	'startDate': 1
  }).limit(3)
    .then(results => res.json(results))
    .catch(err => next(err));
});

export default router;
