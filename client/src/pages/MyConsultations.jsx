import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

function MyConsultations() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const res = await axiosInstance.get('/api/chat/my-chats');
      setChats(res.data);
    };
    fetchChats();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        💬 My Consultations
      </h1>

      {chats.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No consultations found.</div>
      ) : (
        <div className="space-y-6">
          {chats.map((chat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 border">
              <p className="text-gray-700 mb-2">
                <strong>🩺 Symptoms:</strong> {chat.symptoms}
              </p>

              <p className="text-gray-700 mb-2">
                <strong>🤖 AI Suggestion:</strong> {chat.aiResponse}
              </p>

              {chat.doctorReply && (
                <p className="text-green-700 font-medium mt-3">
                  <strong>👨‍⚕️ Doctor’s Reply:</strong> {chat.doctorReply}
                </p>
              )}

              <p className="text-sm text-gray-400 mt-3">
                🕒 {new Date(chat.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyConsultations;
