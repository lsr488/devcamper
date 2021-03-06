const path = require('path');
const express = require('express');
const dotenv = require ('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSantize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
// const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require ('./middleware/error');
const connectDB = require('./config/db');

// Load ENV vars
dotenv.config( { path: './config/config.env' } );

// Connect to database
connectDB();

const app = express();

// body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser())

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

// dev logging middleware
if(process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// file uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSantize());

// Set security headers
app.use(helmet());

// prevent cross-site attacks
app.use(xss());

// Rate Limiting -- need to update to Node v14 to enable this
// const limiter = rateLimit({
// 	windowMs: 10 * 60 * 1000, // 10 minutes
// 	max: 100
// });
// app.use(limiter);

// Prevent http parameter pollution
app.use(hpp());

// Enable cross site origin
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps); // this pre-pends the URL for bootcamps, so in the bootcamps routes, you don't need to include that in the URL
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

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