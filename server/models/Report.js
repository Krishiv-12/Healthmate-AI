import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  reportUrl: { type: String, required: true },
  fileName: { type: String },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Report', reportSchema);
