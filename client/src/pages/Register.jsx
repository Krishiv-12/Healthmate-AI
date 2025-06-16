import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      toast.success('Registered successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-r from-indigo-600 to-white text-black px-10">
        <h1 className="text-4xl font-bold mb-4">Join Us!</h1>
        <p className="text-lg mb-2">Create your account</p>
        <p className="text-sm mb-6 text-center">
          Start your journey toward better health.
        </p>
        <p className="text-sm">Already have an account?</p>
        <Link to="/login">
          <button className="mt-3 px-8 py-2 border border-white rounded-full hover:bg-white hover:text-blue-700 transition">
            Sign In
          </button>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10 bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
          <h2 className="text-3xl font-semibold text-indigo-600 text-center">
            Register
          </h2>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Choose a strong password"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Register As</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
