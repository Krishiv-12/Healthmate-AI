import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get('/appointments/doctor');
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments', err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosInstance.put(`/appointments/${id}/status`, { status });
      fetchAppointments(); // Refresh the list
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">📅 Upcoming Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments yet.</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((appt) => (
            <div key={appt._id} className="bg-white border rounded-xl shadow p-6">
              <p className="text-gray-700"><strong>👤 Patient:</strong> {appt.user?.name} ({appt.patient?.email})</p>
              <p className="text-gray-700"><strong>📆 Date:</strong> {appt.date}</p>
              <p className="text-gray-700"><strong>⏰ Time:</strong> {appt.timeSlot}</p>

              <p className={`font-semibold mt-2 ${
                appt.status === 'Scheduled' ? 'text-blue-600' :
                appt.status === 'Completed' ? 'text-green-600' :
                'text-red-600'
              }`}>
                📝 Status: {appt.status}
              </p>

              {appt.status === 'Scheduled' && (
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleStatusUpdate(appt._id, 'Completed')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                  >
                    ✅ Mark Completed
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(appt._id, 'Cancelled')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoctorAppointments;
