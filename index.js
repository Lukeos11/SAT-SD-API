// Import all the required modules
const express = require('express');
const morgan = require('morgan')
const { errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config();
const connectDB = require('./mongoDB')
const app = express();
const fs = require('fs')
const https = require('https')

// Get the data inside of the ssl keys
const privateKey = fs.readFileSync( 'privatekey.pem' );
const certificate = fs.readFileSync( 'certificate.pem' );

// Connect to the mongo db server
connectDB()

// Enable logging
app.use(morgan('combined'))

// Allow for a json defined body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define the index route
app.get('/', (req, res) => {
    res.status(200).send("Hello World!")
})

// Import and define all the other routers
app.use("/api/v1/auth", require('./routes/userRoutes'));
app.use("/api/v1/financial", require('./routes/financialRoutes'));
app.use("/api/v1/company", require('./routes/companyRoutes'));

// Add the error handler
app.use(errorHandler);

// Create a ssl encrypted server
https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(process.env.PORT || 443, () => console.log("App started http://localhost:" + process.env.PORT));
