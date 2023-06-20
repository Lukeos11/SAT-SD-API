const asyncHandler = require('express-async-handler')

const companyDB = require('../models/companyModel')
const user = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private

const addCost = asyncHandler(async (req, res) => {
  const company = await companyDB.findById(req.user.company)

  if (!req.body.amount) return res.status(400).send({ message: 'Please enter a amount' })
  if (!req.body.reason) return res.status(400).send({ message: 'Please enter a reason' })

  company.financial = parseFloat(company.financial) - Math.abs(req.body.amount); 
  company.history.push({ user: req.user.id, amount: req.body.amount, reason: req.body.reason })
  company.save()

  res.status(200).send({ message: 'Added cost' })
})

const addSale = asyncHandler(async (req, res) => {
  const company = await companyDB.findById(req.user.company)

  if (!req.body.amount) return res.status(400).send({ message: 'Please enter a amount' })
  if (!req.body.reason) return res.status(400).send({ message: 'Please enter a reason' })

  company.financial = parseFloat(company.financial) + Math.abs(req.body.amount); 
  company.history.push({ user: req.user.id, amount: req.body.amount, reason: req.body.reason })
  company.save()

  res.status(200).send({ message: 'Added sale' })
})

const getCompany = asyncHandler(async (req, res) => {
  const company = await companyDB.findById(req.user.company)
  res.status(200).send(company)
})

module.exports = {
  addCost,
  addSale,
  getCompany
}
