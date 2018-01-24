import Found from '../models/found';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all founds
 * @param req
 * @param res
 * @returns void
 */
export function getFounds(req, res) {
  Found
    .find({ user: req.user._id })
    .select('user name title content')
    .sort('-dateAdded')
    .populate({
      path: 'user',
      select: 'name email founds -_id',
      options: { limit: 5 },
      populate: { path: 'founds', select: 'title -_id' }
    })
    .exec((err, founds) => {
      console.log('err', err);
      if (err) {
        res.status(500).send(err);
      }
      res.json({ founds });
    });
}

/**
 * Save a found
 * @param req
 * @param res
 * @returns void
 */
export function addFound(req, res) {
  if (!req.body.found.name || !req.body.found.title || !req.body.found.content) {
    res.status(403).end();
  }

  const newFound = new Found(req.body.found);

  // Let's sanitize inputs
  newFound.title = sanitizeHtml(newFound.title);
  newFound.name = sanitizeHtml(newFound.name);
  newFound.content = sanitizeHtml(newFound.content);

  newFound.slug = slug(newFound.title.toLowerCase(), { lowercase: true });
  newFound.cuid = cuid();
  newFound.user = req.user;
  newFound.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    newFound.user.founds.push(saved._id);
    newFound.user.save((e) => {
      if (e) {
        res.status(500).send(e);
        return;
      }
      res.json({ found: saved });
      return;
    });
  });
}

/**
 * Get a single found
 * @param req
 * @param res
 * @returns void
 */
export function getFound(req, res) {
  Found.findOne({ cuid: req.params.cuid }).exec((err, found) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ found });
  });
}

/**
 * Delete a found
 * @param req
 * @param res
 * @returns void
 */
export function deleteFound(req, res) {
  Found.findOne({ cuid: req.params.cuid }).exec((err, found) => {
    if (err) {
      res.status(500).send(err);
    }

    found.remove(() => {
      res.status(200).end();
    });
  });
}
