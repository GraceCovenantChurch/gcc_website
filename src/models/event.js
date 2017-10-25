import mongoose from 'mongoose';

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
});

export default mongoose.model('Event', EventSchema);
