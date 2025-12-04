import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
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
  expenseBy: {
    type: String,
    required: [true, 'Please specify who made the expense'],
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

export default mongoose.models.Expense || mongoose.model('Expense', expenseSchema);
