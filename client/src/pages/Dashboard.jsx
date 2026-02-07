import { useNavigate } from "react-router-dom";
import doctorImg from "../assets/doctor-hero.png";
import About from "./About";
import Contact from "./Contact";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    if (!user) navigate("/login");
    else navigate("/book-appointment");
  };

  return (
    <>
      {/* HERO SECTION */}
      <div
        className="relative min-h-screen flex items-center px-6 md:px-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1756982477676-420df08af67c?q=80&w=1974&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
 
        {/* Content */}
        <div className="relative w-full text-center flex items-center justify-center md:mt-56">

          {/* LEFT TEXT */}
          <div className="w-full md:w-1/2 text-orange-500 ">
            <h1 className="text-5xl md:text-7xl font-semibold leading-tight mb-2 font-redrose">
              Protecting <br />
                What Matters Most <br />
              <span className="text-green-500 font-redrose">
                With AI Precision
              </span>
            </h1>

            <p className="text-gray-200 text-lg mb-8 font-outfit">
              HealthMate AI combines expert doctors and smart technology to
              provide faster, smarter, and personalized healthcare for you and
              your family.
            </p>

              <button
                onClick={handleAppointmentClick}
                className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-lg font-semibold shadow-lg transition-all hover:scale-105 font-montserratAlt"
              >
                Book Appointment
              </button>
          </div>

        </div>
      </div>

      {/* EXTRA SECTIONS */}
      <About />
      <Contact />
    </>
  );
}

export default Dashboard;
