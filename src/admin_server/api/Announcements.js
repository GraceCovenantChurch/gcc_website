import {Router} from 'express';
import Announcement from '../../models/announcement';

const router = Router();

router.get('/', (req, res, next) => {
  Announcement.find({})
    .then(results => res.json(results))
    .catch(err => next(err));
});

router.post('/create', (req, res, next) => {
  Announcement.create(req.body)
    .then(result => res.json(result))
    .catch(err => next(err));
});

router.post('/:id/update', (req, res, next) => {
  Announcement.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(result => res.json(result))
    .catch(err => next(err));
});

router.post('/:id/delete', (req, res, next) => {
  Announcement.findByIdAndRemove(req.params.id)
    .then(result => res.json(result))
    .catch(err => next(err));
});

export default router;
