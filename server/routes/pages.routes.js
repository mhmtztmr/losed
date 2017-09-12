import { Router } from 'express';
const router = new Router();

// Get all Posts
router.route('/posts').get((req, res) => {
  console.log('redirecting...'); // eslint-disable-line
  res.redirect('/login');
});

export default router;
