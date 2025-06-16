import { useState } from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axiosInstance.post('/contact', form);
    toast.success("Message sent successfully!");
    setForm({ name: '', email: '', message: '' });
  } catch (err) {
    toast.error("Something went wrong. Try again.");
  }
};


  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📬 Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />
        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
