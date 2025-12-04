import mongoose from 'mongoose';

const RefreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now, expires: '30d' },
});

export default mongoose.models.RefreshToken || mongoose.model('RefreshToken', RefreshTokenSchema);
