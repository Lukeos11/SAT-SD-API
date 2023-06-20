const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config();
const connectDB = require('./mongoDB')
const app = express();

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).send("Hello World!")
})

app.use("/api/v1/auth", require('./routes/userRoutes'));
app.use("/api/v1/financial", require('./routes/financialRoutes'));
app.use("/api/v1/company", require('./routes/companyRoutes'));

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => console.log("App started http://localhost:" + process.env.PORT))