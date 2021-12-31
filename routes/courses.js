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
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(advancedResults(Course, {
		path:'bootcamp', // provides the whole object to be displayed
		select: 'name description' // selects which properties to actually be displayed
	}), 
	getCourses)
	.post(addCourse);

router
	.route('/:id')
	.get(getCourse)
	.put(updateCourse)
	.delete(deleteCourse);

module.exports = router;