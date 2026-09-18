const express = require('express')
const mongoose = require('mongoose')
const Note = require('../models/Note')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body
    if (!title || !content) {
      return res.status(400).json({ error: 'title and content are required' })
    }
    const note = await Note.create({ title, content })
    res.status(201).json(note)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 })
    res.json(notes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Note not found' })
    }
    const note = await Note.findByIdAndDelete(id)
    if (!note) {
      return res.status(404).json({ error: 'Note not found' })
    }
    res.json({ message: 'Note deleted', id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router