const express = require('express')
const router = express.Router()

const {
  addCost,
  addSale,
  getStatus,
  getHistory,
} = require('../controllers/financialController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, (req, res) => res.status(200).status("Hello, World!"))
router.route('/addCost').post(protect, addCost)
router.route('/addSale').post(protect, addSale)
router.route('/getStatus').post(protect, getStatus)
router.route('/getHistory').post(protect, getHistory)

module.exports = router
