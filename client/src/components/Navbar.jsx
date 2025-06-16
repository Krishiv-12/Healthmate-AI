import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-indigo-600 text-white px-4 md:px-10 py-6 flex justify-between items-center relative">
      <Link to="/" className="text-xl md:text-2xl font-bold">
        HealthMate AI
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {!user && (
          <>
            <Link to="/login" className="transition duration-300">
              <span className="bg-orange-500 rounded-md px-4 py-2 hover:bg-orange-600">
                Login
              </span>
            </Link>
            <Link to="/register" className="transition duration-300">
              <span className="bg-orange-500 rounded px-4 py-2 hover:bg-orange-600">
                Register
              </span>
            </Link>
          </>
        )}

        {user?.role === "patient" && (
          <>
            {[
              { to: "/symptom-checker", label: "SymptomChecker" },
              { to: "/book-appointment", label: "Book Appointment" },
              { to: "/my-appointments", label: "My Appointments" },
              { to: "/upload-report", label: "Upload Report" },
              { to: "/consultations", label: "My Consultations" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="relative group">
                <span className="group-hover:text-white transition">
                  {link.label}
                </span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
              </Link>
            ))}
          </>
        )}

        {user?.role === "doctor" && (
          <>
            {[
              { to: "/doctor/dashboard", label: "Doctor Dashboard" },
              { to: "/doctor/appointments", label: "Appointments" },
              { to: "/doctor/report", label: "DoctorReports" },
            ].map((link) => (
              <Link key={link.to} to={link.to} className="relative group">
                <span className="group-hover:white transition">
                  {link.label}
                </span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
              </Link>
            ))}
          </>
        )}

        {user?.role === "admin" && (
          <Link to="/admin/AdminDashboard" className="relative group">
            <span className="group-hover:white transition">
              Admin Dashboard
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
          </Link>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className="bg-orange-500 px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Logout
          </button>
        )}
      </div>

      {/* Hamburger Icon */}
      <button onClick={toggleMenu} className="md:hidden text-2xl z-50">
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-blue-400 flex flex-col gap-4 p-6 z-40 md:hidden">
          {!user && (
            <>
              <Link to="/login" onClick={toggleMenu} className="text-white">
                Login
              </Link>
              <Link to="/register" onClick={toggleMenu} className="text-white">
                Register
              </Link>
            </>
          )}

          {user?.role === "patient" &&
            [
              { to: "/consultations", label: "My Consultations" },
              { to: "/upload-report", label: "Upload Report" },
              { to: "/book-appointment", label: "Book Appointment" },
              { to: "/symptom-checker", label: "SymptomChecker" },
              { to: "/my-appointments", label: "My Appointments" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={toggleMenu}
                className="text-white"
              >
                {link.label}
              </Link>
            ))}

          {user?.role === "doctor" &&
            [
              { to: "/doctor/dashboard", label: "Doctor Dashboard" },
              { to: "/doctor/appointments", label: "Appointments" },
              { to: "/doctor/report", label: "DoctorReports" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={toggleMenu}
                className="text-white"
              >
                {link.label}
              </Link>
            ))}

          {user?.role === "admin" && (
            <Link
              to="/admin/AdminDashboard"
              onClick={toggleMenu}
              className="text-white"
            >
              Admin Dashboard
            </Link>
          )}

          {user && (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="bg-orange-500 px-4 py-2 rounded-md text-white"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
