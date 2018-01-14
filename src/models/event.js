import mongoose from 'mongoose';

const ExpireSchema = new mongoose.Schema({
  expireAt: {
    type: Date,
    required: true,
  },
});

ExpireSchema.index({expireAt: 1}, {expireAfterSeconds: 0});

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
    type: mongoose.Schema.Types.ObjectId,
  },
});

const ExpireModel = mongoose.model('Expire', ExpireSchema);

// Unpublish events when they expire
EventSchema.methods.checkExpired = function() {
  if (!this.expiration) {
    return Promise.resolve(this);
  } else {
    return ExpireModel.findOne({
      _id: this.expire,
    }).then(result => {
      if (!result && this.published) {
        this.published = false;
        return this.save();
      } else {
        return Promise.resolve(this);
      }
    });
  }
};

function prefindCheck(query, next) {
  query.inner = true;
  query.exec().then(result => {
    if (Array.isArray(result)) {
      return Promise.all(result.map(res => res.checkExpired()));
    } else {
      return result && result.checkExpired();
    }
  }).then(() => next())
    .catch(err => next(err));
}

EventSchema.pre('find', function(next) {
  if (this.inner) {
    next();
  } else {
    const query = this.model.find(this.getQuery());
    query.inner = true;
    prefindCheck(query, next);
  }
});

EventSchema.pre('findOne', function(next) {
  if (this.inner) {
    next();
  } else {
    const query = this.model.findOne(this.getQuery());
    query.inner = true;
    prefindCheck(query, next);
  }
});

EventSchema.pre('findOneAndUpdate', function(next) {
  if (this.inner) {
    next();
  } else {
    const query = this.model.findOne(this.getQuery());
    query.inner = true;
    prefindCheck(query, next);
  }
});

EventSchema.pre('save', function(next) {
  if (this.expiration && (this.isNew || this.isModified('expiration'))) {
    ExpireModel.create({
      expireAt: this.expiration,
    }).then(expire => {
      this.expire = expire;
      next();
    }).catch(err => next(err));
  } else {
    next();
  }
});

EventSchema.pre('findOneAndUpdate', function(next) {
  const query = this.getQuery();
  const update = this.getUpdate();

  this.model.findOne(query).then(ev => {
    if (!ev) {
      return next();
    }

    const $set = update.$set || {};
    if ($set.expiration && (ev.expiration !== $set.expiration)) {
      return ExpireModel.create({
        expireAt: $set.expiration,
      }).then(expire => {
        this._update.$set.expire = expire;
        next();
      }).catch(err => next(err));
    }
    return next();
  }).catch(err => next(err));
});


export default mongoose.model('Event', EventSchema);
