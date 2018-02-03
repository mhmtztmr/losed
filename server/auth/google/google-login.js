// import jwt from 'jsonwebtoken';
// import User from '../../models/user';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import config from '../../config';

/**
 * Return the Passport Local Strategy object.
 */
export default new GoogleStrategy({
  clientID: '315747158875-fj0jt0dqok5qi0ll5ha8tsaeaidbgbc8.apps.googleusercontent.com',
  clientSecret: 'SFxIBCoGWng5UMzBgI4sBBFD',
  callbackURL: 'http://www.example.com/auth/google/callback'
}, (accessToken, refreshToken, profile /* , done */) => {
  console.log('aaaaaaaaaaaaa', profile);
  // const userData = {
  //   email: profile.email.trim(),
  //   googleId: profile.id
  // };

  // // find a user by email address
  // return User.findOne({ googleId: userData.googleId }, (err, user) => {
  //   if (err) { return done(err); }

  //   if (!user) {
  //     const error = new Error('Incorrect email or password');
  //     error.name = 'IncorrectCredentialsError';

  //     return done(error);
  //   }

  //   return done(null, token, data);
  // });
});
