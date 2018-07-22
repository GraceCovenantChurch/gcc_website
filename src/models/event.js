import mongoose from 'mongoose';

// Schema for objects tracking expiration
const ExpireSchema = new mongoose.Schema({
  expireAt: {
    type: Date,
    required: true,
  },
});

// Track the `expireAt` field and remove the document once that timestamp is reached
ExpireSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const EventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  published: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  expiration: {
    type: Date,
  },
  expire: {
    // Events will store the id of the their expiration object
    type: mongoose.Schema.Types.ObjectId,
  },
});

const ExpireModel = mongoose.model('Expire', ExpireSchema);

// Unpublish events when they expire
// This returns a promise which resolves to the same event it is called on
EventSchema.methods.checkExpired = function checkExpired() {
  if (!this.expiration) {
    // Just return the same event if it has no expiration
    return Promise.resolve(this);
  }

  // Otherwise, attempt to find its expire object
  return ExpireModel.findOne({
    _id: this.expire,
  }).then((result) => {
    if (!result && this.published) {
      // If it doesn't exist then it has expired. Unpublish the event
      this.published = false;
      return this.save();
    }

    return Promise.resolve(this);
  });
};

function prefindCheck(query) {
  const innerQuery = Object.assign(query, {
    inner: true,
  });
  return innerQuery.exec().then((result) => {
    if (Array.isArray(result)) {
      return Promise.all(result.map(res => res.checkExpired()));
    }

    return result && result.checkExpired();
  });
}

// Set up pre `find` hook
EventSchema.pre('find', function preFind(next) {
  if (this.inner) {
    next();
  } else {
    const query = this.model.find(this.getQuery());
    prefindCheck(query).then(() => next()).catch(err => next(err));
  }
});

// Set up pre `findOne` hook
EventSchema.pre('findOne', function preFindOne(next) {
  if (this.inner) {
    next();
  } else {
    const query = this.model.findOne(this.getQuery());
    prefindCheck(query).then(() => next()).catch(err => next(err));
  }
});

// Set up pre `findOneAndUpdate` hook
// This hook also updates an event's expiration if it has changed
EventSchema.pre('findOneAndUpdate', function preFindOneAndUpdate(next) {
  if (this.inner) {
    next();
  } else {
    const query = this.model.findOne(this.getQuery());
    query.inner = true;
    prefindCheck(query).then((ev) => {
      const update = this.getUpdate();

      if (!ev) {
        return next();
      }

      // Update event expiration if it has changed
      const $set = update.$set || {};
      if ($set.expiration && (ev.expiration !== $set.expiration)) {
        return ExpireModel.create({
          expireAt: $set.expiration,
        }).then((expire) => {
          this._update.$set.expire = expire;
          return next();
        }).catch(err => next(err));
      }

      return next();
    }).catch(err => next(err));
  }
});

// Set up a pre `save` hook which sets an event's expire object if it is new
// or if its expiration date has been modified
EventSchema.pre('save', function preSave(next) {
  if (this.expiration && (this.isNew || this.isModified('expiration'))) {
    ExpireModel.create({
      expireAt: this.expiration,
    }).then((expire) => {
      this.expire = expire;
      next();
    }).catch(err => next(err));
  } else {
    next();
  }
});

export default mongoose.model('Event', EventSchema);
