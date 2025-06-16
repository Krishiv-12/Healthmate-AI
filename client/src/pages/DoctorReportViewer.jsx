import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

function DoctorReportViewer() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axiosInstance.get('/appointments/doctor').then(res => {
      setAppointments(res.data.filter(a => a.status === 'Completed'));
    });
  }, []);

  const fetchReports = async (appointmentId) => {
    try {
      const res = await axiosInstance.get(`/reports/appointment/${appointmentId}`);
      setReports(res.data);
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  const handleAppointmentSelect = (e) => {
    const id = e.target.value;
    setSelectedAppointment(id);
    if (id) fetchReports(id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        📁 View Patient Medical Reports
      </h1>

      <select
        className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleAppointmentSelect}
        value={selectedAppointment}
      >
        <option value="">Select Completed Appointment</option>
        {appointments.map((appt) => (
          <option key={appt._id} value={appt._id}>
            {appt.date} - {appt.patient?.name}
          </option>
        ))}
      </select>

      {reports.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {reports.map((report) => (
            <div key={report._id} className="bg-white border rounded-xl p-5 shadow hover:shadow-md transition">
              <p className="text-lg font-medium text-gray-800 mb-2">{report.fileName}</p>
              <a
                href={report.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                🔗 View Report
              </a>
              
              <p className="text-sm text-gray-500 mt-2">
                Uploaded: {new Date(report.uploadedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : selectedAppointment ? (
        <p className="text-center text-gray-500 mt-4">No reports found for this appointment.</p>
      ) : null}
    </div>
  );
}

export default DoctorReportViewer;
