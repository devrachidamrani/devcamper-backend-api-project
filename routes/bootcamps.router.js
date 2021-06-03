const express = require('express')
const router = express.Router()

// Show all bootcamps
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Show all bootcamps',
  })
})

// Show bootcamp by id
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Show bootcamp ${req.params.id}`,
  })
})

// Create bootcamp
router.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    msg: `Create new bootcamp`,
  })
})

// Update bootcamp by id
router.put('/:id', (req, res) => {
  res.status(201).json({
    success: true,
    msg: `Bootcamp with the given ${req.params.id} id updated`,
  })
})

// Delete bootcamp by id

router.delete('/:id', (req, res) => {
  res.status(201).json({
    success: true,
    msg: `Bootcamp with the given ${req.params.id} id deleted`,
  })
})

module.exports = router
