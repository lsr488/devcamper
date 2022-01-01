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

	// Create and send cookie with password token
	sendTokenResponse(user, 200, res);
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

	sendTokenResponse(user, 200, res);
});


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	// Create password token
	const token = user.getSignedJwtToken();

	// create cookie
	const options = {
		// math logic converts cookie-parser's default time to days, eg 30 day expiration
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		// access cookie via
		httpOnly: true
	};

	if(process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	res
		.status(statusCode)
		.cookie('token', token, options)
		.json({
			success: true,
			token
		});
}
