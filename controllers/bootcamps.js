const path = require('path');
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
	res.status(200).json(res.advancedResults);
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
	const bootcamp = await Bootcamp.findById(req.params.id);

	if(!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
	}

	bootcamp.remove();

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

// @desc 			Upload photo for bootcamp
// @route 		PUT /api/v1/bootcamps/:id/photo
// @access 		Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);

	if(!bootcamp) {
		return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
	}

	if(!req.files) {
		return next(new ErrorResponse('Please upload file', 400));
	}

	const file = req.files.file;

	// make sure file is image
	if(!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse('File is not an image', 400));		
	}

	// check file size
	if(file.size > process.env.FILE_UPLOAD_MAX) {
		return next(new ErrorResponse(`Upload file less than ${FILE_UPLOAD_MAX}`, 400));				
	}

	// rename file to unique filename
	file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

	// actually move/upload file
	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
		if(err) {
			console.error(err);
			return next(new ErrorResponse('Problem with file upload', 500));
		}

		await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

		res.status(200).json({
			success: true,
			data: file.name
		});
	});
});
