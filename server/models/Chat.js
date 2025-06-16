import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    symptoms: String,
    aiResponse: String,
    doctorReply: String, // NEW FIELD
    repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Chat', chatSchema);
