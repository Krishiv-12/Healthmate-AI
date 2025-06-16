import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

function DoctorDashboard() {
  const [chats, setChats] = useState([]);
  const [reply, setReply] = useState({});

  useEffect(() => {
    const fetchAllChats = async () => {
      try {
        const res = await axiosInstance.get('/chat/all-chats');
        setChats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllChats();
  }, []);

  const handleReplySubmit = async (chatId) => {
    if (!reply[chatId]) return;

    await axiosInstance.post(`/chat/reply/${chatId}`, {
      doctorReply: reply[chatId],
    });

    setReply((prev) => ({ ...prev, [chatId]: '' }));
    alert('Reply submitted');
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Doctor Dashboard 🩺</h1>
      {chats.map((chat, idx) => (
        <div key={idx} className="mb-6 border p-4 rounded bg-gray-50">
          <p><strong>User:</strong> {chat.user.name} ({chat.user.email})</p>
          <p><strong>Symptoms:</strong> {chat.symptoms}</p>
          <p><strong>AI Suggestion:</strong> {chat.aiResponse}</p>

          {chat.doctorReply ? (
            <p className="mt-2 text-green-600"><strong>Doctor’s Reply:</strong> {chat.doctorReply}</p>
          ) : (
            <div className="mt-3">
              <textarea
                placeholder="Write your reply here..."
                value={reply[chat._id] || ''}
                onChange={(e) => setReply({ ...reply, [chat._id]: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => handleReplySubmit(chat._id)}
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
              >
                Submit Reply
              </button>
            </div>
          )}

          <p className="text-sm text-gray-500 mt-2">{new Date(chat.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default DoctorDashboard;
