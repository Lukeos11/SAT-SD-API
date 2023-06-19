const mongoose = require('mongoose')

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

module.exports = mongoose.model('Company', companySchema)
