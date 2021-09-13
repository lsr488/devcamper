const express = require('express');
const dotenv = require ('dotenv');

// Load ENV vars
dotenv.config( { path: './config/config.env' } );

const app = express();




// /api/v1/courses
// /api/v1/reviews
// /api/v1/auth
// /api/v1/users

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));