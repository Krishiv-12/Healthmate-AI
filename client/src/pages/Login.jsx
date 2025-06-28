import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success('Login Successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-r from-indigo-600 to-white text-white px-10">
        <h1 className="text-4xl font-bold mb-4">Hey There!</h1>
        <p className="text-lg mb-2">Welcome Back.</p>
        <p className="text-sm mb-6 text-center">
          You are just one step away to your health journey.
        </p>
        <p className="text-sm">Don't have an account?</p>
        <Link to="/register">
          <button className="mt-3 px-8 py-2 border border-white rounded-full hover:bg-white hover:text-blue-700 transition">
            Sign Up
          </button>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10 bg-white">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <h2 className="text-3xl font-semibold text-blue-700 text-center">Sign In</h2>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <div className="text-right text-sm mt-1">
              <Link to="/forgot-password" className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:indigo-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
