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
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
   <footer className="relative bg-indigo-600 text-white pt-10 pb-6 px-4 md:px-10">
      {/* WAVES */}
<div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <div className="relative w-[200%] h-[100px] animate-wave-slow">
          <svg className="absolute w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
              fill="#1a2f7d"
              opacity="0.7"
            />
          </svg>
        </div>
        <div className="absolute top-0 w-[200%] h-[100px] animate-wave-fast">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
              fill="#1a2f7d"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 z-10 relative">
        <div>
          <h2 className="text-2xl font-bold mb-2">HealthMate AI</h2>
          <p className="text-sm text-gray-300">
            Your trusted AI-powered healthcare assistant. Fast. Private. Reliable.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#"><FaFacebookF className="hover:text-blue-300" /></a>
            <a href="#"><FaTwitter className="hover:text-blue-300" /></a>
            <a href="#"><FaInstagram className="hover:text-blue-300" /></a>
            <a href="#"><FaLinkedin className="hover:text-blue-300" /></a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/symptom-checker" className="hover:underline">Symptom Checker</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/book-appointment" className="hover:underline">Book Appointment</Link></li>
            <li><Link to="/consultations" className="hover:underline">AI Consultation</Link></li>
            <li><Link to="/upload-report" className="hover:underline">Upload Reports</Link></li>
            <li><Link to="/my-appointments" className="hover:underline">My Appointments</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Subscribe</h3>
          <p className="text-sm text-gray-300 mb-2">Get health tips & updates:</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed successfully!");
            }}
            className="flex flex-col sm:flex-row items-center gap-2"
          >
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded text-black w-full sm:w-auto"
              required
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 pt-4 text-center text-sm text-gray-400 z-10 relative">
        © {new Date().getFullYear()} HealthMate AI. All rights reserved.
      </div>

      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
}

export default Footer;
