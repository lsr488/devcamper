const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc 			Register user
// @route 		POST /api/v1/auth/register
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

	// Create password token
	const token = user.getSignedJwtToken();

	res.status(200).json({ success: true, token });
});

// @desc 			Login user
// @route 		POST /api/v1/auth/login
// @access 		Public
exports.login = asyncHandler(async (req, res, next) => {
	// destructure to pull variables from req.body
	const { email, password } = req.body;

	// Validate login information
	if(!email || !password) {
		return next(new ErrorResponse('Please provide valid email and password', 400));
	}

	// Check for user
	const user = await User.findOne({ email }).select('+password');

	if(!user) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	// Check if password matches
	const passwordIsMatch = await user.matchPassword(password);

	if(!passwordIsMatch) {
		return next(new ErrorResponse('Invalid credentials', 401));	
	}

	// Create password token
	const token = user.getSignedJwtToken();

	res.status(200).json({ success: true, token });
});
