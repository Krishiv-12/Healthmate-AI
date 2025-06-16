import { useNavigate } from "react-router-dom";
import doctorImg from "../assets/doctor-hero.png";
import About from "./About";
import Contact from "./Contact";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/book-appointment");
    }
  };

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-16 bg-slate-100 min-h-screen">
        {/* Left Text Content */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-8xl font-bold text-gray-900 leading-tight mb-6">
            Serving Your <span className="text-orange-500">Health</span> Needs
            Is Our Priority.
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Your health is our mission. At HealthMate AI, we blend expert care
            with cutting-edge AI tools to provide personalized medical support
            when you need it most.
          </p>
          <button
            onClick={handleAppointmentClick}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded shadow-md transition"
          >
            Make Appointment
          </button>
        </div>

        {/* Right Doctor Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={doctorImg}
            alt="Doctor"
            className="w-[90%] max-w-md rounded-xl drop-shadow-xl"
          />
        </div>
      </div>
      <About />
      <Contact />
    </>
  );
}

export default Dashboard;
//
