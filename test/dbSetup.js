/* eslint-env node, jest */
import mongoose from 'mongoose';
import nconf from '../src/config';

export function withDB() {
  let db = null;

  beforeAll(() => (
    new Promise((resolve, reject) => {
      db = mongoose.connect(nconf.get('MONGODB_URI'), { useMongoClient: true }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(db);
        }
      });
    })
  ));

  afterAll(() => {
    db && db.close();
  });
}
