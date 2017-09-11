import * as mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

const mockgoose = new Mockgoose(mongoose);

export function connectDB(t, done) {
  mockgoose.prepareStorage().then(() => {
    mongoose.connect('mongodb://shipper:shipper123@ds139470.mlab.com:39470/shiptr', err => {
      if (err) t.fail('Unable to connect to test database');
      done();
    });
  });
}

export function dropDB(t) {
  mockgoose.helper.reset().then(err => {
    if (err) t.fail('Unable to reset test database');
  });
}
