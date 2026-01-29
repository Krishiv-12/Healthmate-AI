import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

function UploadReport() {
  const [file, setFile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [uploadedReports, setUploadedReports] = useState([]);

  useEffect(() => {
    // Get all completed appointments
    axiosInstance.get("/api/appointments/my").then((res) => {
      setAppointments(res.data.filter((a) => a.status === "Completed"));
    });

    // Get uploaded reports
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axiosInstance.get("/api/reports/my");
      setUploadedReports(res.data);
    } catch (err) {
      console.error("Failed to fetch reports");
    }
  };

  const handleUpload = async () => {
    if (!file || !selectedAppointment) {
      return toast.error("Please select an appointment and a report file.");
    }

    const formData = new FormData();
    formData.append("report", file);
    formData.append("appointmentId", selectedAppointment);

    try {
      await axiosInstance.post("/reports/upload", formData);
      toast.success("Report uploaded successfully!");
      setFile(null);
      setSelectedAppointment("");
      fetchReports();
    } catch (err) {
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <Toaster />

      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-3xl p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Upload Medical Report
          </h2>
          <p className="text-gray-500">
            Select a completed appointment and upload the report (PDF/Image).
          </p>
        </div>

        <div className="space-y-4">
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSelectedAppointment(e.target.value)}
            value={selectedAppointment}
          >
            <option value="">Choose Completed Appointment</option>
            {appointments.map((a) => (
              <option key={a._id} value={a._id}>
                {a.date} - Dr. {a.doctor?.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-600 file:text-white file:cursor-pointer"
          />

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={handleUpload}
          >
            Upload Report
          </button>
        </div>
      </div>

      {/* Report History Section */}
      <div className="max-w-2xl mx-auto mt-12 bg-white p-6 rounded-3xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          📄 Uploaded Reports
        </h3>
        {uploadedReports.length === 0 ? (
          <p className="text-gray-500">No reports uploaded yet.</p>
        ) : (
          <ul className="space-y-2">
            {uploadedReports.map((report) => (
              <li
                key={report._id}
                className="border border-gray-200 rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {report?.appointment?.doctor?.name || "Doctor"} —{" "}
                    {report?.appointment?.date}
                  </p>
                  <p className="text-sm text-gray-500">
                    {report.fileName || "Uploaded Report"} •{" "}
                    {new Date(report.uploadedAt).toLocaleString()}
                  </p>
                </div>
                <a
                  href={report.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm font-medium"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UploadReport;
