const express = require('express');
const router = express.Router();

// ### ROUTES ###
// /api/v1/bootcamps
// the full URL is pre-pended in the server

// get all bootcamps from database
router.get('/', (req, res) => {

});

// get one bootcamp by id
router.get('/:id', (req, res) => {
	res.status(200).json({ success: true, msg: `Show bootcamp # ${req.params.id}` });
});

// create new bootcamp
router.post('/', (req, res) => {
	res.status(200).json({ success: true, msg: 'Create new bootcamp.' });
});

// update a bootcamp by id
router.put('/:id', (req, res) => {
	res.status(200).json({ success: true, msg: `Update bootcamp # ${req.params.id}` });
});

// delete a bootcamp by id
router.delete('/:id', (req, res) => {
	res.status(200).json({ success: true, msg: `Delete bootcamp # ${req.params.id}` });
});

module.exports = router;