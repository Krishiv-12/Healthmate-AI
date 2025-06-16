import User from '../models/User.js';
import Appointment from '../models/Appointment.js';
import Report from '../models/Report.js';

export const getStats = async (req, res) => {
  const totalPatients = await User.countDocuments({ role: 'Patient' });
  const totalDoctors = await User.countDocuments({ role: 'Doctor' });
  const totalAppointments = await Appointment.countDocuments();
  const totalReports = await Report.countDocuments();

  res.json({ totalPatients, totalDoctors, totalAppointments, totalReports });
};
