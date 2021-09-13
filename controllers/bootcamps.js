// export methods so they can be brought in the server
// these are essentially our middleware
exports.getBootcamps = (req, res, next) => {
	res.status(200).json({ success: true, msg: 'Show all bootcamps.' });
}