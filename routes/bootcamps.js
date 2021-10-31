const express = require('express');

// bring in controller methods
const { 
	getBootcamps,
	getBootcamp,
	createBootcamp,
	updateBootcamp,
	deleteBootcamp,
	getBootcampsInRadius
} = require('../controllers/bootcamps')

// /api/v1/bootcamps
// the full URL is pre-pended in the server

const router = express.Router();

// route for within radius
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

// much more concisely creates the routes, with the logic all in the controller file
router
	.route('/')
	.get(getBootcamps)
	.post(createBootcamp);

router.route('/:id')
	.get(getBootcamp)
	.put(updateBootcamp)
	.delete(deleteBootcamp);

module.exports = router;