import Lost from '../models/lost';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all losts
 * @param req
 * @param res
 * @returns void
 */
export function getLosts(req, res) {
  Lost
    .find({ user: req.user._id })
    .select('user name title content')
    .sort('-dateAdded')
    .populate({
      path: 'user',
      select: 'name email losts -_id',
      options: { limit: 5 },
      populate: { path: 'losts', select: 'title -_id' }
    })
    .exec((err, losts) => {
      console.log('err', err);
      if (err) {
        res.status(500).send(err);
      }
      res.json({ losts });
    });
}

/**
 * Save a lost
 * @param req
 * @param res
 * @returns void
 */
export function addLost(req, res) {
  if (!req.body.lost.name || !req.body.lost.title || !req.body.lost.content) {
    res.status(403).end();
  }

  const newLost = new Lost(req.body.lost);

  // Let's sanitize inputs
  newLost.title = sanitizeHtml(newLost.title);
  newLost.name = sanitizeHtml(newLost.name);
  newLost.content = sanitizeHtml(newLost.content);

  newLost.slug = slug(newLost.title.toLowerCase(), { lowercase: true });
  newLost.cuid = cuid();
  newLost.user = req.user;
  newLost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    newLost.user.losts.push(saved._id);
    newLost.user.save((e) => {
      if (e) {
        res.status(500).send(e);
        return;
      }
      res.json({ lost: saved });
      return;
    });
  });
}

/**
 * Get a single lost
 * @param req
 * @param res
 * @returns void
 */
export function getLost(req, res) {
  Lost.findOne({ cuid: req.params.cuid }).exec((err, lost) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lost });
  });
}

/**
 * Delete a lost
 * @param req
 * @param res
 * @returns void
 */
export function deleteLost(req, res) {
  Lost.findOne({ cuid: req.params.cuid }).exec((err, lost) => {
    if (err) {
      res.status(500).send(err);
    }

    lost.remove(() => {
      res.status(200).end();
    });
  });
}
