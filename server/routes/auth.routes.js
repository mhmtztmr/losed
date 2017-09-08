import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = new Router();

// Login
router.route('/login').post(AuthController.login);

// Register
router.route('/signup').post(AuthController.signup);

export default router;
