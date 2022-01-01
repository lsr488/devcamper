const express = require('express');
// bring in controller methods
const { 
	getCourses,
	getCourse,
	addCourse,
	updateCourse,
	deleteCourse 
} = require('../controllers/courses');

const Course = require('../models/Course');

// Middleware
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(advancedResults(Course, {
		path:'bootcamp', // provides the whole object to be displayed
		select: 'name description' // selects which properties to actually be displayed
	}), 
	getCourses)
	.post(protect, authorize('publisher', 'admin'), addCourse);

router
	.route('/:id')
	.get(getCourse)
	.put(protect, authorize('publisher', 'admin'), updateCourse)
	.delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;