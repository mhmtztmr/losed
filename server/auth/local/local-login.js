import jwt from 'jsonwebtoken';
import User from '../../models/user';
import { default as LocalStrategy } from 'passport-local';
import config from '../../config';

/**
 * Return the Passport Local Strategy object.
 */
export default new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
  };

  // find a user by email address
  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: user._id,
      };

      // create a token string
      const token = jwt.sign(payload, config.jwtSecret);

      const data = {
        name: user.name,
      };

      return done(null, token, data);
    });
  });
});
