import express from 'express';
import { Feedback } from '../models/Feedback.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, course, rating, comments } = req.body;
    
    if (!name || !email || !course || !rating || !comments) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const feedback = new Feedback({
      name,
      email,
      course,
      rating: parseInt(rating),
      comments
    });

    await feedback.save();

    res.status(201).json({ 
      message: 'Feedback submitted successfully', 
      feedback: {
        id: feedback._id,
        name: feedback.name,
        course: feedback.course,
        rating: feedback.rating
      }
    });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Server error while saving feedback' });
  }
});

export default router;