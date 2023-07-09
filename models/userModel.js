const mongoose = require('mongoose')

// Define a new schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    permissions: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

// Create a new model with the generated schema
module.exports = mongoose.model('User', userSchema)
