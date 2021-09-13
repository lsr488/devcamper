const express = require('express');
const dotenv = require ('dotenv');

// Load ENV vars
dotenv.config( { path: './config/config.env' } );

const app = express();

// ### ROUTES ###
// /api/v1/bootcamps

// get all bootcamps from database
app.get('/api/v1/bootcamps', (req, res) => {
	res.status(200).json({ success: true, msg: 'Show all bootcamps.' });
});

// get one bootcamp by id
app.get('/api/v1/bootcamps/:id', (req, res) => {
	res.status(200).json({ success: true, msg: `Show bootcamp # ${req.params.id}` });
});

// create new bootcamp
app.post('/api/v1/bootcamps', (req, res) => {
	res.status(200).json({ success: true, msg: 'Create new bootcamp.' });
});

// update a bootcamp by id
app.put('/api/v1/bootcamps/:id', (req, res) => {
	res.status(200).json({ success: true, msg: `Update bootcamp # ${req.params.id}` });
});

// delete a bootcamp by id
app.delete('/api/v1/bootcamps/:id', (req, res) => {
	res.status(200).json({ success: true, msg: `Delete bootcamp # ${req.params.id}` });
});


// /api/v1/courses
// /api/v1/reviews
// /api/v1/auth
// /api/v1/users

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));