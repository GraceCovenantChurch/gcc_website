import { Router } from 'express';
import EventModel from '../../models/event';

const router = Router();

router.get('/', (req, res, next) => {
  EventModel.find({})
    .then(results => res.json(results))
    .catch(err => next(err));
});

router.post('/create', (req, res, next) => {
  EventModel.create(req.body)
    .then(result => res.json(result))
    .catch(err => next(err));
});

router.post('/:id/update', (req, res, next) => {
  EventModel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true },
  )
    .then(result => res.json(result))
    .catch(err => next(err));
});

router.post('/:id/delete', (req, res, next) => {
  EventModel.findByIdAndRemove(req.params.id)
    .then(result => res.json(result))
    .catch(err => next(err));
});

export default router;
