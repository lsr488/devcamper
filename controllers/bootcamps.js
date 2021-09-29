const Bootcamp = require('../models/Bootcamp');

// export methods so they can be brought in the server
// these are essentially our middleware

// @desc 			Get All bootcamps
// @route 		GET /api/v1/bootcamps
// @access 		Public
exports.getBootcamps = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: 'Show all bootcamps.'});
}

// @desc 			Get single bootcamp
// @route 		GET /api/v1/bootcamps/:id
// @access 		Public
exports.getBootcamp = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: `Show bootcamp # ${req.params.id}` });
}

// @desc 			Create single bootcamp
// @route 		POST /api/v1/bootcamps
// @access 		Private
exports.createBootcamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.create(req.body);

		res.status(201).json({
			success: true,
			data: bootcamp
		});
	} catch (err) {
		res.status(400).json({ success: false });
	}

	// console.log(req.body);
	// res
	// 	.status(200)
	// 	.json({ success: true, msg: 'Create new bootcamp.' });
}

// @desc 			Update single bootcamp
// @route 		PUT /api/v1/bootcamps/:id
// @access 		Private
exports.updateBootcamp = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: `Update bootcamp # ${req.params.id}` });
}

// @desc 			Delete single bootcamp
// @route 		DELETE /api/v1/bootcamps/:id
// @access 		Private
exports.deleteBootcamp = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: `Delete bootcamp # ${req.params.id}` });
}