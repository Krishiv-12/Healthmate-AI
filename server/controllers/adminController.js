import User from '../models/User.js';
import Appointment from '../models/Appointment.js';
import Report from '../models/Report.js';

export const getStats = async (req, res) => {
  try {
    const users = await User.find();
console.log("USERS IN PROD:", users.length);

    const totalPatients = await User.countDocuments({ role: 'patient' });
    const totalDoctors = await User.countDocuments({ role: 'doctor' });
    const totalAppointments = await Appointment.countDocuments();
    const totalReports = await Report.countDocuments();

    res.json({ totalPatients, totalDoctors, totalAppointments, totalReports });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

