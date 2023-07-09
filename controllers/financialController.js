const asyncHandler = require('express-async-handler')

// Get the databases
const companyDB = require('../models/companyModel')
const user = require('../models/userModel')

// @desc    Add a cost to the company
// @route   POST /api/v1/financial/addcost
// @access  Private
const addCost = asyncHandler(async (req, res) => {
  // Get the company by the authed user
  const company = await companyDB.findById(req.user.company)

  // Check that the amount and reason is defined
  if (!req.body.amount) return res.status(400).send({ message: 'Please enter a amount' })
  if (!req.body.reason) return res.status(400).send({ message: 'Please enter a reason' })

  // Save the data to the DB
  company.financial = parseFloat(company.financial) - Math.abs(req.body.amount); 
  // Add an object to the history component
  company.history.push({ user: req.user.id, amount: req.body.amount, reason: req.body.reason })
  // Save the data to the DB
  company.save()

  // Return the status and message
  res.status(200).send({ message: 'Added cost' })
})

// @desc    Add a sale to the company
// @route   POST /api/v1/financial/addsale
// @access  Private
const addSale = asyncHandler(async (req, res) => {
  // Get the company by the authed user
  const company = await companyDB.findById(req.user.company)

  // Check that the amount and reason is defined
  if (!req.body.amount) return res.status(400).send({ message: 'Please enter a amount' })
  if (!req.body.reason) return res.status(400).send({ message: 'Please enter a reason' })

  // Save the data to the DB
  company.financial = parseFloat(company.financial) + Math.abs(req.body.amount); 
  // Add an object to the history component
  company.history.push({ user: req.user.id, amount: req.body.amount, reason: req.body.reason })
  // Save the data to the DB
  company.save()

  // Return the status and message
  res.status(200).send({ message: 'Added sale' })
})

// @desc    Get the company
// @route   GET /api/v1/financial/get company
// @access  Private
const getCompany = asyncHandler(async (req, res) => {
  // Get the company from the DB
  const company = await companyDB.findById(req.user.company)
  // Return the company
  res.status(200).send(company)
})

// Export all the functions
module.exports = {
  addCost,
  addSale,
  getCompany
}
