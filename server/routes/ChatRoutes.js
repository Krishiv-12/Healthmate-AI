import express from 'express';
import Chat from '../models/Chat.js';
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Save chat
router.post('/save-chat', authMiddleware, async (req, res) => {
  const { symptoms, aiResponse } = req.body;
  const newChat = new Chat({
    user: req.userId,
    symptoms,
    aiResponse,
  });
  await newChat.save();
  res.json({ msg: 'Chat saved successfully' });
});

// Get user chat history
router.get('/my-chats', authMiddleware, async (req, res) => {
  const chats = await Chat.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(chats);
});

router.get('/all-chats', authMiddleware, roleMiddleware(['doctor', 'admin']), async (req, res) => {
    const chats = await Chat.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(chats);
  });

  router.post(
    '/reply/:chatId',
    authMiddleware,
    roleMiddleware(['doctor']),
    async (req, res) => {
      const { chatId } = req.params;
      const { doctorReply } = req.body;
  
      const chat = await Chat.findById(chatId);
      if (!chat) return res.status(404).json({ msg: 'Chat not found' });
  
      chat.doctorReply = doctorReply;
      chat.repliedBy = req.userId;
      await chat.save();
  
      res.json({ msg: 'Reply added successfully' });
    }
  );

export default router;
