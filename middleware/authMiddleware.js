const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Define the protect function
const protect = asyncHandler(async (req, res, next) => {
  let token

  // Check if the user has sent a token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Try to verify the token
    try {
      // Get the token from the headers
      token = req.headers.authorization.split(' ')[1]

      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Find the user based on the token
      req.user = await User.findById(decoded.id).select('-password')

      // Continue with other functions
      next()
    } catch (error) {
      // Catch any errors or if there is no token
      // Log the error
      console.log(error)
      // Set the status for the error handler function
      res.status(401)
      // Throw the error
      throw new Error('Not authorized')
    }
  }

  // If there is still no token
  if (!token) {
    // Set the status for the error handler function
    res.status(401)
    // Throw the error
    throw new Error('Not authorized, no token')
  }
})

// Create the site admin protect function
const siteAdminProtect = asyncHandler(async (req, res, next) => {
  // Get the user
  const user = JSON.parse(JSON.stringify(req.user)) // idk why but doesnt work otherwise
  // Check the permission level
  if (user && user.sitePermissions.toLowerCase() == "admin") {
    // Return and continue with other functions
    return next();
  }

  // If there is no token then set the status for the error handler function
  res.status(401)
  // Throw the error
  throw new Error('Not authorized') 
})

// Export the functions
module.exports = { protect, siteAdminProtect }

