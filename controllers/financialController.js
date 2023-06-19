const asyncHandler = require('express-async-handler')

const companyDB = require('../models/companyModel')
const user = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private

const addCost = asyncHandler(async (req, res) => {
  const company = companyDB.findoneById(req.user.companyId)

})

const addSale = asyncHandler(async (req, res) => {
  const company = companyDB.findoneById(req.user.companyId)

})

const getStatus = asyncHandler(async (req, res) => {
  const company = companyDB.findById(req.user.companyId)
  console.log(company.obj)
  res.status(200).send({ financialStatus: company })
})

const getHistory = asyncHandler(async (req, res) => {
  const company = companyDB.findById(req.user.companyId)

  res.status(200).send({ history: company.history })
})

module.exports = {
  addCost,
  addSale,
  getStatus,
  getHistory,
}
