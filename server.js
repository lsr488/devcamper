const express = require('express');
const dotenv = require ('dotenv');
const morgan = require('morgan');


// Bring in Routes
const bootcamps = require('./routes/bootcamps');

// Load ENV vars
dotenv.config( { path: './config/config.env' } );

const app = express();

// dev logging middleware
if(process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// mount routers
app.use('/api/v1/bootcamps', bootcamps); // this pre-pends the URL for bootcamps, so in the bootcamps routes, you don't need to include that in the URL

// /api/v1/courses
// /api/v1/reviews
// /api/v1/auth
// /api/v1/users

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));