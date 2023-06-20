const express = require('express')
const router = express.Router()

const {
  addCost,
  addSale,
  getCompany,
} = require('../controllers/financialController')

const { protect } = require('../middleware/authMiddleware')

router.route('/addCost').post(protect, addCost)
router.route('/addSale').post(protect, addSale)
router.route('/getCompany').get(protect, getCompany)

module.exports = router
