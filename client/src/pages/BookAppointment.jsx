import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import doctorImg from '../assets/doctor.png';

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    doctorId: '',
    date: '',
    time: '',
    problem: '',
  });

useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const res = await axiosInstance.get('/api/auth/doctors');
      setDoctors(res.data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error.response?.data || error.message);
    }
  };
  fetchDoctors();
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/appointments', form);
      alert('Appointment booked successfully!');
      setForm({
        name: '',
        email: '',
        doctorId: '',
        date: '',
        time: '',
        problem: '',
      });
    } catch (err) {
      alert(err.response?.data?.msg || 'Booking failed');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 py-10 bg-slate-100">
      {/* Left Image */}
      <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
        <img src={doctorImg} alt="Doctor" className="max-w-xs md:max-w-xl rounded-xl drop-shadow-md" />
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Book An Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
          <select
            value={form.doctorId}
            onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Choose Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>{doc.name}</option>
            ))}
          </select>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
          <textarea
            placeholder="Describe Your Problem"
            value={form.problem}
            onChange={(e) => setForm({ ...form, problem: e.target.value })}
            className="w-full p-3 border rounded-lg"
            rows={3}
          ></textarea>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
