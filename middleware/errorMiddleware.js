// Error handler function
function errorHandler(err, req, res, next) {
  // Get the status code set already
  const statusCode = res.statusCode ? res.statusCode : 500

  // Set the status code if it has not been set already
  res.status(statusCode)

  // Return to the client the error and stack if required
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV.toLowerCase() === 'production' ? null : err.stack,
  })
}

// Export the function
module.exports = { errorHandler }
