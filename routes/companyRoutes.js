const express = require('express')
const router = express.Router()

const {
  addCompany,
  deleteCompany,
  getCompanyByUser,
  getCompanyById,
} = require('../controllers/companyController')

const { protect, siteAdminProtect } = require('../middleware/authMiddleware')

router.route('/addCompany').post(protect, siteAdminProtect, addCompany)
router.route('/deleteCompany').delete(protect, siteAdminProtect, deleteCompany)
router.route('/getCompanyByUser').get(protect, siteAdminProtect, getCompanyByUser)

module.exports = router
