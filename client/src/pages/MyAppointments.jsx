import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axiosInstance.get('/appointments/my');
      setAppointments(res.data);
    };
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen max-w-5xl mx-auto bg-slate-100 px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📅 My Appointments</h1>

      {appointments.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-lg">No appointments found.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {appointments.map((appt) => (
            <div key={appt._id} className="bg-white rounded-xl shadow-lg border p-6 transition hover:shadow-xl">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">👨‍⚕️ Doctor: {appt.doctor?.name || 'N/A'}</h2>
              <p className="text-gray-600 mb-1">📅 Date: <span className="font-medium">{appt.date}</span></p>
              <p className="text-gray-600 mb-1">⏰ Time: <span className="font-medium">{appt.time}</span></p>
              
              <p className="mt-3 inline-block text-sm font-medium px-3 py-1 rounded-full
                ${
                  appt.status === 'Scheduled'
                    ? 'bg-blue-100 text-blue-700'
                    : appt.status === 'Completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }">
                Status: {appt.status}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                Booked on: {new Date(appt.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
