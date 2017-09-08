/**
 * Get user profile
 * @param req
 * @param res
 * @returns void
 */
export function getProfile(req, res) {
  console.log(req.user);
  res.json(req.user);
}
