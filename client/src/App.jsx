import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorAppointments from "./pages/DoctorAppointments";
import MyConsultations from "./pages/MyConsultations";
import DoctorDashboard from "./pages/DoctorDashboard";
import SymptomChecker from "./pages/SymptomChecker";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import UploadReport from "./pages/UploadReport";
import DoctorReportViewer from "./pages/DoctorReportViewer";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route path="/consultations" element={<MyConsultations />} />
        <Route
          path="/book-appointment"
          element={user ? <BookAppointment /> : <Navigate to="/login" />}
        />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/upload-report" element={<UploadReport />} />

        {/* Doctor */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route
          path="/doctor/appointments"
          element={<DoctorAppointments />}
        />
        <Route path="/doctor/report" element={<DoctorReportViewer />} />

        {/* Admin */}
        <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="bg-slate-100 min-h-screen">
        <Toaster position="top-right" />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
