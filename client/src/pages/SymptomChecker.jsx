import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Toaster, toast } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!symptoms.trim()) return toast.error("Please describe your symptoms.");
    setLoading(true);

    try {
      const aiRes = await axiosInstance.post('/api/ai/symptom-check', {
        symptoms,
      });

      const reply = aiRes.data.reply;
      setResponse(reply);

      await axiosInstance.post('/api/chat/save-chat', {
        symptoms,
        aiResponse: reply,
      });


    } catch (err) {
      console.error(err);
      toast.error("Failed to get AI response.");
      setResponse('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  const handleClear = () => {
    setSymptoms('');
    setResponse('');
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <Toaster />
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">🤖 Symptom Checker</h1>
          <p className="text-gray-500 mt-2">
            Describe your health symptoms, and our AI will suggest possible causes. This is not a substitute for professional advice.
          </p>
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">Your Symptoms</label>
          <textarea
            rows={5}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. I've had a sore throat, cough, and mild fever for two days..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleCheck}
            disabled={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition flex justify-center items-center"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Checking...
              </>
            ) : (
              'Check with AI'
            )}
          </button>

          <button
            onClick={handleClear}
            disabled={loading}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-xl transition"
          >
            Clear
          </button>
        </div>

        {response && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mt-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-2 text-blue-600">🧠 AI Response</h2>
            <p className="text-gray-700 whitespace-pre-line">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SymptomChecker;
