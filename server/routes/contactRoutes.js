import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ msg: 'Message received successfully!' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
