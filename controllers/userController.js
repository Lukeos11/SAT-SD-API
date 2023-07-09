const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Private
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, permissions } = req.body

  // check that all fields are defined
  if (!name || !email || !password) {
    // Return the status
    res.status(400)
    // Throw a new error for the error handler
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  // If a user exists
  if (userExists) {
    // Return the status
    res.status(400)
    // Throw a new error for the error handler
    throw new Error('User already exists')
  }

  // TODO: User email send with password registeration, password being sent by manager is a temporary setup (Prototype would be correctly done in real system)

  // Hash password with salt
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Get the company from the managers account
  const companyId = req.user.company

  // Create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    company: companyId,
    permissions,
  })

  // If the creation was successful
  if (user) {
    // Return some basic information to the client
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    // Return the status
    res.status(400)
    // Throw a new error for the error handler
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user by email
  const user = await User.findOne({ email })

  // If there is a user then compare the passwords
  if (user && (await bcrypt.compare(password, user.password))) {
    // Return back basic information to the client with the clients token
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    // Return the status
    res.status(400)
    // Throw a new error for the error handler
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  // Return the status and user data
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  // Return the generated user JSON Web Token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

// Export all the functions
module.exports = {
  registerUser,
  loginUser,
  getMe,
}
