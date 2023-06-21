const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const siteAdminProtect = asyncHandler(async (req, res, next) => {
  const user = JSON.parse(JSON.stringify(req.user)) // idk why but doesnt work otherwise
  if (user && user.sitePermissions.toLowerCase() == "admin") {
    return next();
  }

  res.status(401)
  throw new Error('Not authorized')  
})

module.exports = { protect, siteAdminProtect }



"{\"_id\":\"648bbc351ad966839a712c16\",\"name\":\"Luke Withington\",\"email\":\"lwithington12@gmail.com\",\"permissions\":\"Admin\",\"company\":\"648bb63116e3373b0846c6b0\",\"createdAt\":\"2023-06-16T01:34:45.957Z\",\"updatedAt\":\"2023-06-16T01:34:45.957Z\",\"__v\":0,\"sitePermissions\":\"Admin\"}"
