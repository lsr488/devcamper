const express = require('express');

// bring in controller methods
const { 
	getBootcamps,
	getBootcamp,
	createBootcamp,
	updateBootcamp,
	deleteBootcamp,
	getBootcampsInRadius,
	bootcampPhotoUpload
} = require('../controllers/bootcamps')

const Bootcamp = require('../models/Bootcamp');

// MIDDLEWARE
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

// include other resource routers (to access things related to bootcamps, like courses)
const courseRouter = require('./courses');

// /api/v1/bootcamps
// the full URL is pre-pended in the server
const router = express.Router();

// Reroute into other resource routers (like courses)
router.use('/:bootcampId/courses', courseRouter);

// route for within radius
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo').put(protect, bootcampPhotoUpload);

// much more concisely creates the routes, with the logic all in the controller file
router
	.route('/')
	.get(advancedResults(Bootcamp, 'courses'), getBootcamps)
	.post(protect, createBootcamp);

router.route('/:id')
	.get(getBootcamp)
	.put(protect, updateBootcamp)
	.delete(protect, deleteBootcamp);

module.exports = router;