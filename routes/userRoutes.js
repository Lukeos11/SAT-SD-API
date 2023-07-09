const express = require('express')
// Define a new router
const router = express.Router()

// Extract functions from controller file
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
// Get the route protect function
const { protect } = require('../middleware/authMiddleware')

// Define the API end points
router.post('/', protect, registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

// Export the router
module.exports = router
