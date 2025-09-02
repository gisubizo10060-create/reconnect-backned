const express = require('express');
const router = express.Router();
const Entry = require('../models/entry'); // Make sure this model exists

// Test route
router.get('/test', (req, res) => {
  res.send('✅ Admin entries route is working');
});

// GET all user entries
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.status(200).json(entries);
  } catch (err) {
    console.error('Error fetching entries:', err);
    res.status(500).json({ message: 'Failed to fetch entries' });
  }
});

// PATCH: update entry status (approve, flag, etc.)
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(updatedEntry);
  } catch (err) {
    console.error('Error updating entry status:', err);
    res.status(500).json({ message: 'Failed to update status' });
  }
});

module.exports = router;
