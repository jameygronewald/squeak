import express from 'express';
import {
  fetchPlaces,
  getPlace,
  postPlace,
  putPlace,
  deletePlace,
} from '../controllers/placeController';

const router = express.Router();

router.post('/places/fetch', fetchPlaces);

router.get('/places/:userId', getPlace);

router.post('/places', postPlace);

router.put('/places/:id', putPlace);

router.delete('/places/:id', deletePlace);

module.exports = router;
