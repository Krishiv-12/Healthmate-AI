import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance.js';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    totalReports: 0,
  });

  useEffect(() => {
    axiosInstance.get('/api/admin/stats').then(res => {
      console.log(res.data);
      setStats(res.data);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Patients" value={stats.totalPatients} />
        <Card title="Total Doctors" value={stats.totalDoctors} />
        <Card title="Appointments" value={stats.totalAppointments} />
        <Card title="Reports Uploaded" value={stats.totalReports} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <p className="text-2xl font-bold text-indigo-600">{value}</p>
    </div>
  );
}

export default AdminDashboard;
