import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
const Schema = mongoose.Schema;

// define the User model schema
const UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true },
  },
  password: String,
  name: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  losts: [{ type: Schema.Types.ObjectId, ref: 'Lost' }],
  founds: [{ type: Schema.Types.ObjectId, ref: 'Found' }]
});


/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function (next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt(undefined, (saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, () => {}, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});


export default mongoose.model('User', UserSchema);
