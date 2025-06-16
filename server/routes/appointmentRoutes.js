import express from 'express';
import Appointment from '../models/Appointment.js';
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Book appointment (Patient)
router.post('/', authMiddleware, roleMiddleware(['patient']), async (req, res) => {
  const { doctorId, date, time } = req.body;

  const existing = await Appointment.findOne({ doctor: doctorId, date, time });
  if (existing) return res.status(400).json({ msg: 'Slot already booked' });

  const appointment = await Appointment.create({
    patient: req.userId,
    doctor: doctorId,
    date,
    time,
  });

  res.json({ msg: 'Appointment booked', appointment });
});

// Get patient appointments
router.get('/my', authMiddleware, roleMiddleware(['patient']), async (req, res) => {
  const appointments = await Appointment.find({ patient: req.userId }).populate('doctor', 'name email');
  res.json(appointments);
});

// Get doctor appointments
router.get('/doctor', authMiddleware, roleMiddleware(['doctor']), async (req, res) => {
  const appointments = await Appointment.find({ doctor: req.userId }).populate('patient', 'name email');
  res.json(appointments);
});

router.put('/:id/status', authMiddleware, roleMiddleware(['doctor']), async (req, res) => {
  const { status } = req.body;

  if (!['Completed', 'Cancelled'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status' });
  }

  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

  appointment.status = status;
  await appointment.save();

  res.json({ msg: 'Appointment updated', appointment });
});

export default router;
