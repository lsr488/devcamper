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

// include other resource routers (to access things related to bootcamps, like courses)
const courseRouter = require('./courses');

// /api/v1/bootcamps
// the full URL is pre-pended in the server
const router = express.Router();

// MIDDLEWARE
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Reroute into other resource routers (like courses)
router.use('/:bootcampId/courses', courseRouter);

// route for within radius
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

// much more concisely creates the routes, with the logic all in the controller file
router
	.route('/')
	.get(advancedResults(Bootcamp, 'courses'), getBootcamps)
	.post(protect, authorize('publisher', 'admin'), createBootcamp);

router.route('/:id')
	.get(getBootcamp)
	.put(protect, authorize('publisher', 'admin'), updateBootcamp)
	.delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;