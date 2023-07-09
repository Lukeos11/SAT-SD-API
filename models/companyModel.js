const mongoose = require('mongoose')

// Define a new schema
const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    financial: {
      type: "decimal",
      required: true,
    },
    history: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
)

// Create a new model with the generated schema
module.exports = mongoose.model('Company', companySchema)
