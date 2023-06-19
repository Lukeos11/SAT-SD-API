const express = require('express')
const router = express.Router()

const {
  addCost,
  addSale,
  getStatus,
  getHistory,
} = require('../controllers/financialController')

const { protect } = require('../middleware/authMiddleware')

router.route('/addCost').post(protect, addCost)
router.route('/addSale').post(protect, addSale)
router.route('/getStatus').get(protect, getStatus)
router.route('/getHistory').get(protect, getHistory)

module.exports = router
