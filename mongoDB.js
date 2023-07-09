const mongoose = require('mongoose')

// Define the connectDB function
const connectDB = async () => {
  try {
    // Try to connect to the DB
    const conn = await mongoose.connect(process.env.MONGO_URI)

    // Log out that the API connected to the server
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    // Print out any errors
    console.log(error)
    // Close the application
    process.exit(1)
  }
}

// Export the function
module.exports = connectDB
