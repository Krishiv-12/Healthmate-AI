import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/symptom-check', async (req, res) => {
  const { symptoms } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct', // or any other model
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI health assistant that gives possible causes and advice based on symptoms.',
          },
          {
            role: 'user',
            content: `My symptoms are: ${symptoms}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI response failed' });
  }
});

export default router;
