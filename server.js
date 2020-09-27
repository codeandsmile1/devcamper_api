const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const connectDB = require('./config/db');
const colors = require('colors');


//Route files
const bootcamps = require('./routes/bootcamps'); 

//Connect to database
connectDB();

// Load env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(logger);

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`.yellow.bold)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server & exit proccess
  server.close(() => process.exit(1));
})
