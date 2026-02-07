import { useState } from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/contact", form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <section className="relative py-24 px-6 text-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">

        {/* LEFT INFO */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#1a2f7d]">
            Let’s Talk About Your Health 💬
          </h2>
          <p className="text-black mb-8 leading-relaxed">
            Have questions about HealthMate AI? Want personalized healthcare
            solutions for your family? Our team is ready to help you anytime.
          </p>

          <div className="flex gap-5 text-2xl text-black">
            <FaLinkedin className="hover:text-orange-400 transition cursor-pointer" />
            <FaGithub className="hover:text-orange-400 transition cursor-pointer" />
            <FaTwitter className="hover:text-orange-400 transition cursor-pointer" />
          </div>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl space-y-5"
        >
          <h3 className="text-2xl font-semibold mb-4 text-[#1a2f7d]">Send us a message</h3>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-semibold shadow-lg transition-all hover:scale-[1.02]"
          >
            Send Message 🚀
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
