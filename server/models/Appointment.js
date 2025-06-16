import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // e.g., "2025-04-15"
  time: { type: String, required: true }, // e.g., "10:00 AM"
  status: { type: String, default: 'Scheduled' }, // Scheduled | Completed | Cancelled
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Appointment', appointmentSchema);
