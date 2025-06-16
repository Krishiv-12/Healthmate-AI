import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ msg: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });
  res.status(201).json({ msg: 'Registered Successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
});

// GET all doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('name email');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch doctors' });
  }
});


export default router;
