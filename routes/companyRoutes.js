const express = require('express')
// Define a new router
const router = express.Router()

// Extract functions from controller file
const {
  addCompany,
  deleteCompany,
  getCompanyByUser,
  getCompanyById,
} = require('../controllers/companyController')
// Get the route protect and site protect function
const { protect, siteAdminProtect } = require('../middleware/authMiddleware')

// Define the API end points
router.route('/addCompany').post(protect, siteAdminProtect, addCompany)
router.route('/deleteCompany').delete(protect, siteAdminProtect, deleteCompany)
router.route('/getCompanyByUser').get(protect, siteAdminProtect, getCompanyByUser)

// Export the router
module.exports = router
