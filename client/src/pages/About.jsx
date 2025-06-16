import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-[#1a2f7d] mb-6">
        About HealthMate AI 💙
      </h1>

      {/* Description */}
      <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto mb-12">
        HealthMate AI is an AI-powered healthcare assistant designed to bring convenience and care together.
        From booking appointments to checking symptoms using AI and accessing your medical reports — everything is now just a few clicks away. We aim to empower patients and doctors with a seamless digital experience.
      </p>

      {/* Sections */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Services Section */}
        <div className="bg-white border rounded-xl p-6 shadow hover:shadow-md transition">
          <h2 className="text-2xl font-semibold text-[#1a2f7d] mb-4">🛠️ Our Services</h2>
          <ul className="space-y-3 text-gray-700">
            <li>✔️ AI-Based Symptom Checker</li>
            <li>✔️ Book and Manage Appointments</li>
            <li>✔️ Upload & View Medical Reports</li>
            <li>✔️ Consultation History with AI + Doctor Replies</li>
            <li>✔️ Role-based Dashboard for Patients and Doctors</li>
          </ul>
        </div>

        {/* Project Features Section */}
        <div className="bg-white border rounded-xl p-6 shadow hover:shadow-md transition">
          <h2 className="text-2xl font-semibold text-[#1a2f7d] mb-4">🚀 Why HealthMate AI?</h2>
          <ul className="space-y-3 text-gray-700">
            <li>💡 Smart AI suggestions based on patient symptoms</li>
            <li>🔐 Secure and role-based login (Patient / Doctor)</li>
            <li>📁 Seamless medical report management</li>
            <li>🕒 Real-time appointment tracking</li>
            <li>📈 Clean, responsive, and modern UI experience</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
