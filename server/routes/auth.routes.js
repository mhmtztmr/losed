import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = new Router();

// Login
router.route('/login').post(AuthController.login);

// Login
router.route('/google-login').post(AuthController.googleLogin);

// Register
router.route('/signup').post(AuthController.signup);

export default router;
