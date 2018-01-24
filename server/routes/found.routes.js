import { Router } from 'express';
import * as FoundController from '../controllers/found.controller';
const router = new Router();

// Get all Posts
router.route('/founds').get(FoundController.getFounds);

// Get one post by cuid
router.route('/founds/:cuid').get(FoundController.getFound);

// Add a new Post
router.route('/founds').post(FoundController.addFound);

// Delete a post by cuid
router.route('/founds/:cuid').delete(FoundController.deleteFound);

export default router;
