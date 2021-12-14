const express = require('express');
const dotenv = require ('dotenv');
const morgan = require('morgan');
const errorHandler = require ('./middleware/error');
const connectDB = require('./config/db');

// Load ENV vars
dotenv.config( { path: './config/config.env' } );

// Connect to database
connectDB();

const app = express();

// body parser
app.use(express.json());

// Bring in Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

// dev logging middleware
if(process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// mount routers
app.use('/api/v1/bootcamps', bootcamps); // this pre-pends the URL for bootcamps, so in the bootcamps routes, you don't need to include that in the URL
app.use('/api/v1/courses', courses);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// server is a variable so it can be started/stopped as needed via functions
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
	// close server and exit process with error
	server.close(() => process.exit(1));
});