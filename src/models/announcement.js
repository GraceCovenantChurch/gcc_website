import mongoose from 'mongoose';

export const AnnouncementSchema = mongoose.Schema({
  index: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  published: {
    type: Boolean,
  },
  link: {
    type: String,
  },
  expiration: {
    type: Date,
  },
});

export default mongoose.model('Announcement', AnnouncementSchema);
