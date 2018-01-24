import { Router } from 'express';
const router = new Router();

// Get all Posts
router.route('/').get((req, res, next) => {
  console.log('redirecting...'); // eslint-disable-line
  // res.redirect('/login');
  next();
});

export default router;
