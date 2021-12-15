const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');

// @desc 			Get ALL courses
// @route 		GET /api/v1/courses
// @route 		GET /api/v1/bootcamps/:bootcampID/courses
// @access 		Public
exports.getCourses = asyncHandler(async (req, res, next) => {
	let query;

	if(req.params.bootcampId) {
		query = Course.find({ bootcamp: req.params.bootcampId })
	} else {
		query = Course.find().populate({
			path: 'bootcamp', // provides the whole bootcamp object to be displayed
			select: 'name description' // selects which properties of bootcamp to actually be displayed
		});
	}

	const courses = await query;

	res.status(200).json({
		success: true,
		count: courses.length,
		data: courses
	})
});