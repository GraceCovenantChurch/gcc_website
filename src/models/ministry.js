import mongoose from 'mongoose';

export const MinistrySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Ministry', MinistrySchema);
