import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaArrowUp,
} from "react-icons/fa";

function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#2c72ec] text-white pt-14 pb-6 px-4 sm:px-6 lg:px-12 overflow-hidden">

      {/* WAVES */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <div className="relative w-[200%] h-[90px] animate-wave-slow">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z" fill="#1a2f7d" opacity="0.7" />
          </svg>
        </div>
        <div className="absolute top-0 w-[200%] h-[90px] animate-wave-fast">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z" fill="#1a2f7d" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">

        {/* Brand */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1">HealthMate AI</h2>
          <p className="hidden sm:block text-sm text-gray-200 leading-relaxed">
            Your trusted AI-powered healthcare assistant. Fast. Private. Reliable.
          </p>

          <div className="flex justify-center sm:justify-start gap-4 mt-3 text-lg">
            <FaFacebookF className="hover:text-blue-300 cursor-pointer" />
            <FaTwitter className="hover:text-blue-300 cursor-pointer" />
            <FaInstagram className="hover:text-blue-300 cursor-pointer" />
            <FaLinkedin className="hover:text-blue-300 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/symptom-checker" className="hover:underline">Symptom Checker</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="hidden lg:block">
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/book-appointment" className="hover:underline">Book Appointment</Link></li>
            <li><Link to="/consultations" className="hover:underline">AI Consultation</Link></li>
            <li><Link to="/upload-report" className="hover:underline">Upload Reports</Link></li>
            <li><Link to="/my-appointments" className="hover:underline">My Appointments</Link></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div className="hidden sm:block">
          <h3 className="text-lg font-semibold mb-3">Subscribe</h3>
          <p className="text-sm text-gray-200 mb-3">
            Get health tips & updates:
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed successfully!");
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded text-black w-full focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 mt-10 pt-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} HealthMate AI. All rights reserved.
      </div>

      {/* Scroll to top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
}

export default Footer;
