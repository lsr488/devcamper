const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamp');

// export methods so they can be brought in the server
// these are essentially our middleware

// @desc 			Get All bootcamps
// @route 		GET /api/v1/bootcamps
// @access 		Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
	// pull keywords from query to use as mongoose methods
	let query;

	// copy req.query
	const reqQuery = { ...req.query };

	// fields to exclude
	const removeFields = ['select'];

	// loop over removeFields and deletethem from reqQuery
	removeFields.forEach(param => delete reqQuery[param]);

	console.log(reqQuery);

	// create query string
	let queryString = JSON.stringify(req.query);

	// replace takes a regex and an optional functional to create operators ($gt, $gte, etc)
	queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

	// finding resource
	query = Bootcamp.find(JSON.parse(queryString));

	// executing query
	const bootcamps = await query;
	
	res.status(200).json({ 
		success: true,
		count: bootcamps.length,
		data: bootcamps
	});
});

// @desc 			Get single bootcamp
// @route 		GET /api/v1/bootcamps/:id
// @access 		Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);

	if(!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		data: bootcamp
	});
});

// @desc 			Create single bootcamp
// @route 		POST /api/v1/bootcamps
// @access 		Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.create(req.body);

	res.status(201).json({
		success: true,
		data: bootcamp
	});
});

// @desc 			Update single bootcamp
// @route 		PUT /api/v1/bootcamps/:id
// @access 		Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	});

	if(!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
	}

	res.status(200).json({ success: true, data: bootcamp });
});

// @desc 			Delete single bootcamp
// @route 		DELETE /api/v1/bootcamps/:id
// @access 		Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

	if(!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
	}

	res.status(200).json({ success: true, data: {} });
});

// @desc 			Get bootcamps within a radius
// @route 		GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access 		Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
	// params from URL
	const { zipcode, distance } = req.params;

	// get lat/long from geocoder
	const loc = await geocoder.geocode(zipcode);
	const lat = loc[0].latitude;
	const long = loc[0].longitude;

	// calculate radius using radians
	// divide distance by radius of Earth
	// Earth radius = 3963 miles
	const EARTH_RADIUS_MILES = 3693;
	const radius = distance / EARTH_RADIUS_MILES;

	const bootcamps = await Bootcamp.find({
		location: { $geoWithin: { $centerSphere: [ [ long, lat ], radius ] } }
	});

	res.status(200).json({
		success: true,
		count: bootcamps.length,
		data: bootcamps
	});

});
