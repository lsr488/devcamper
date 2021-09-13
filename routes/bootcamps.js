const express = require('express');
const router = express.Router();

// ### ROUTES ###
// /api/v1/bootcamps

// get all bootcamps from database
server.get('/api/v1/bootcamps', (req, res) => {
	res.status(200).json({ success: true, msg: 'Show all bootcamps.' });
});

// get one bootcamp by id
server.get('/api/v1/bootcamps/:id', (req, res) => {
	res.status(200).json({ success: true, msg: `Show bootcamp # ${req.params.id}` });
});

// create new bootcamp
server.post('/api/v1/bootcamps', (req, res) => {
	res.status(200).json({ success: true, msg: 'Create new bootcamp.' });
});

// update a bootcamp by id
server.put('/api/v1/bootcamps/:id', (req, res) => {
	res.status(200).json({ success: true, msg: `Update bootcamp # ${req.params.id}` });
});

// delete a bootcamp by id
server.delete('/api/v1/bootcamps/:id', (req, res) => {
	res.status(200).json({ success: true, msg: `Delete bootcamp # ${req.params.id}` });
});