const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

// Get the databases
const companyDB = require('../models/companyModel')
const user = require('../models/userModel')

// @desc    Add a company
// @route   GET /api/v1/company/addcompany
// @access  Private
const addCompany = asyncHandler(async (req, res) => {
    const { name, adminName, adminEmail, adminPassword } = req.body

    // Check all the required fields are defined
    if (!name || !adminName || !adminEmail || !adminPassword) {
        // Return the status
        res.status(400)
        // Throw a new error for the error handler
        throw new Error('Please provide all required fields.')
    }

    // Get any companies with that name
    const companyExists = await companyDB.findOne({ name: name })

    // If a company already exists
    if (companyExists) {
        // Return the status
        res.status(400)
        // Throw a new error for the error handler
        throw new Error('Company already exists.')
    }
    
    // Create a new company
    const company = await companyDB.create({ name: name, financial: 0, history: [] })

    if (company) {

        // Get any users with that email
        const userExists = await user.findOne({ email: adminEmail })

        // If a user already exists with that email
        if (userExists) {
            // Return the status
            res.status(400)
            // Throw a new error for the error handler
            throw new Error('User already exists.')
        }

        // Hash the password and generate the salt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(adminPassword, salt)

        // Create a new user and add it to the company
        const adminUser = await user.create({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            company: company.id,
            permissions: "Admin",
            sitePermissions: "None"
        })

        // Return the status and some basic information about the user
        res.status(201).json({
          _adminId: adminUser.id,
          adminName: adminUser.name,
          adminEmail: adminUser.email,
          companyId: company.id,
          companyName: company.name
        })
    } else {
        // Return the status
        res.status(400)
        // Throw a new error for the error handler
        throw new Error('Invalid user data')
    }
})

// @desc    Delete a company
// @route   DELETE /api/v1/company/deletecompany
// @access  Private
const deleteCompany = asyncHandler(async (req, res) => {
    // Check there is a provided company ID
    if (!req.body.companyId) {
        // Return the status
        res.status(400)
        // Throw a new error for the error handler
        throw new Error("Please provide the company ID.")
    }

    // Delete the company from the DB
    const company = await companyDB.findByIdAndDelete(req.body.companyId);

    // Get all the users and delete them
    const users = await user.deleteMany({ company: req.body.companyId })

    // Return the status and message to the client
    res.status(200).send({ message: 'Completed', company, users })
})

// @desc    Get a company by user
// @route   GET /api/v1/company/getcompanybyuser
// @access  Private
const getCompanyByUser = asyncHandler(async (req, res) => {
    // Get the user's company
    const company = await companyDB.findById(req.user.company)
    
    // Return the status and message to the client
    res.status(200).send(company)
})

// @desc    Get a company by ID
// @route   GET /api/v1/company/getcompanybyid
// @access  Private
const getCompanyById = asyncHandler(async (req, res) => {
    // Check there is a provided company ID
    if (!req.body.companyId) {
        // Return the status
        res.status(400)
        // Throw a new error for the error handler
        throw new Error("Please provide the company ID.")
    }
    
    // Get the company
    const company = await companyDB.findById(companyId);
    
    // Return the status and company to the client
    res.status(200).send(company)
})

// Export all the functions
module.exports = {
    addCompany,
    deleteCompany,
    getCompanyByUser,
    getCompanyById,
}
