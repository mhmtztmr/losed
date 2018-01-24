import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post
    .find({ user: req.user._id })
    .select('user name title content')
    .sort('-dateAdded')
    .populate({
      path: 'user',
      select: 'name email posts -_id',
      options: { limit: 5 },
      populate: { path: 'posts', select: 'title -_id' }
    })
    .exec((err, posts) => {
      console.log('err', err);
      if (err) {
        res.status(500).send(err);
      }
      res.json({ posts });
    });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.user = req.user;
  newPost.save((err, saved) => {
    console.log(err);
    if (err) {
      res.status(500).send(err);
    } else {
      newPost.user.posts.push(saved._id);
      newPost.user.save((e) => {
        console.log(e);
        if (e) {
          res.status(500).send(e);
        } else {
          res.json({ post: saved });
        }
      });
    }
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
