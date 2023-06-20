const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const companyDB = require('../models/companyModel')
const user = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private

const addCompany = asyncHandler(async (req, res) => {
    const { name, adminName, adminEmail, adminPassword } = req.body

    if (!name || !adminName || !adminEmail || !adminPassword) {
        res.status(400)
        throw new Error('Please provide all required fields.')
    }

    const companyExists = await companyDB.findOne({ name: name })

    if (companyExists) {
        res.status(400)
        throw new Error('Company already exists.')
    }
    
    const company = await companyDB.create({ name: name, financial: 0, history: [] })

    if (company) {

        const userExists = await user.findOne({ email: adminEmail })

        if (userExists) {
            res.status(400)
            throw new Error('User already exists.')
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(adminPassword, salt)

        // Create user
        const adminUser = await user.create({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            company: company.id,
            permissions: "Admin",
            sitePermissions: "None"
        })

        res.status(201).json({
          _adminId: adminUser.id,
          adminName: adminUser.name,
          adminEmail: adminUser.email,
          companyId: company.id,
          companyName: company.name
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


const deleteCompany = asyncHandler(async (req, res) => {
  if (!req.body.companyId) {
    res.status(200)
    throw new Error("Please provide the company ID.")
  }

  const company = await companyDB.findByIdAndDelete(req.body.companyId);

  const users = await user.deleteMany({ company: req.body.companyId })

  console.log(users)

  res.status(200).send({ message: 'Completed', company, users })
})

const getCompanyByUser = asyncHandler(async (req, res) => {
    const company = await companyDB.findById(req.user.company)
        
    res.status(200).send(company)
})

const getCompanyById = asyncHandler(async (req, res) => {
    if (!req.body.companyId) {
        res.status(200)
        throw new Error("Please provide the company ID.")
    }
    
    const company = await companyDB.findById(companyId);
    
    res.status(200).send(company)
})

module.exports = {
    addCompany,
    deleteCompany,
    getCompanyByUser,
    getCompanyById,
}
