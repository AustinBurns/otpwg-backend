import express from 'express';

import { LocationController } from '../controllers';
import { Location } from '../models';

const router = express.Router();

router.route('/').get(new LocationController(Location).search);

export default router;
