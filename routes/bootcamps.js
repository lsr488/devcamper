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

// include other resource routers (to access things related to bootcamps, like courses)
const courseRouter = require('./courses');

// /api/v1/bootcamps
// the full URL is pre-pended in the server
const router = express.Router();

// Reroute into other resource routers (like courses)
router.use('/:bootcampId/courses', courseRouter);

// route for within radius
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/:id/photo').put(bootcampPhotoUpload);

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