const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc 			Register user
// @route 		GET /api/v1/auth/register
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
