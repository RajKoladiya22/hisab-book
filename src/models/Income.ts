import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Please provide a date'],
  },
  details: {
    type: String,
    required: [true, 'Please provide details'],
  },
  amount: {
    type: Number,
    required: [true, 'Please provide an amount'],
  },
  receivedBy: {
    type: String,
    required: [true, 'Please specify who received the income'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  attachments: [
    {
      type: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Income || mongoose.model('Income', incomeSchema);
