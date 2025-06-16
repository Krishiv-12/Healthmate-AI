import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Report from '../models/Report.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

dotenv.config();

const router = express.Router();

// Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary config (already added in your project)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST: Upload Report
router.post('/upload', authMiddleware, upload.single('report'), async (req, res) => {
  try {
    const file = req.file;
    const { appointmentId } = req.body;

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder: 'healthmate-reports' },
      async (error, result) => {
        if (error) return res.status(500).json({ msg: 'Cloudinary error', error });

        const report = new Report({
          patient: req.user._id,
          appointment: appointmentId, // ✅ correct usage
          reportUrl: result.secure_url, // ✅ now it's correct
          fileName: file.originalname,
        });

        await report.save();
        res.json({ msg: 'Report uploaded', report });
      }
    );

    stream.end(file.buffer);
  } catch (err) {
    res.status(500).json({ msg: 'Upload failed', error: err.message });
  }
});


// GET: Get all reports for a patient
router.get('/my', authMiddleware, async (req, res) => {
  const reports = await Report.find({ patient: req.user._id }).sort({ uploadedAt: -1 });
  res.json(reports);
});

// GET: Get all reports for a specific appointment (for doctor)
router.get('/appointment/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const reports = await Report.find({ appointment: id });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
