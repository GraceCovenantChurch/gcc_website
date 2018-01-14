import { Router } from 'express';
import MinistryModel from '../../models/ministry';

const router = Router();

router.get('/', (req, res, next) => {
  MinistryModel.find({})
    .then(results => res.json(results))
    .catch(err => next(err));
});

router.post('/create', (req, res, next) => {
  MinistryModel.create(req.body)
    .then(result => res.json(result))
    .catch(err => next(err));
});

router.post('/:id/update', (req, res, next) => {
  MinistryModel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true },
  )
    .then(result => res.json(result))
    .catch(err => next(err));
});

router.post('/:id/delete', (req, res, next) => {
  MinistryModel.findByIdAndRemove(req.params.id)
    .then(result => res.json(result))
    .catch(err => next(err));
});

export default router;
