import { Router } from 'express';
import * as LostController from '../controllers/lost.controller';
const router = new Router();

// Get all Posts
router.route('/losts').get(LostController.getLosts);

// Get one post by cuid
router.route('/losts/:cuid').get(LostController.getLost);

// Add a new Post
router.route('/losts').post(LostController.addLost);

// Delete a post by cuid
router.route('/losts/:cuid').delete(LostController.deleteLost);

export default router;
