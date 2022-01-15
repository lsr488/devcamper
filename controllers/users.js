const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc 			Get all users
// @route 		GET /api/v1/users/
// @access 		Public
exports.register = asyncHandler(async (req, res, next) => {
	// destructure to pull variables from req.body
	const { name, email, password, role } = req.body;

	// Create user
	const user = await User.create({
		name,
		email,
		password,
		role
	});