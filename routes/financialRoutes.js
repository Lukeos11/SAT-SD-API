const express = require('express')
// Define a new router
const router = express.Router()

// Extract functions from controller file
const {
  addCost,
  addSale,
  getCompany,
} = require('../controllers/financialController')
// Get the route protect function
const { protect } = require('../middleware/authMiddleware')

// Define the API end points
router.route('/addCost').post(protect, addCost)
router.route('/addSale').post(protect, addSale)
router.route('/getCompany').get(protect, getCompany)

// Export the router
module.exports = router
