import { Router } from 'express';
import { create } from '../controllers/user.controller';
import { validCreateUser } from '../middleware/user.validation';

const router = Router();

router
    .route('/')
    .post(validCreateUser, create);

export default router;
