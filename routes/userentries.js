const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');

// POST: User submits a form
router.post('/', async (req, res) => {
  try {
    const newEntry = new Entry(req.body);
    await newEntry.save();
    res.status(201).json({ message: 'Entry submitted successfully', entry: newEntry });
  } catch (err) {
    console.error('Submission error:', err);
    res.status(500).json({ message: 'Failed to submit entry' });
  }
});

module.exports = router;
