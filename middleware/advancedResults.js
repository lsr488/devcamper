// this format is a shortcut to put a function inside a function
const advancedResults = (model, populate) => async (req, res, next) => {
	// pull keywords from query to use as mongoose methods
	let query;

	// copy req.query
	const reqQuery = { ...req.query };

	// fields to exclude
	const removeFields = ['select', 'sort', 'page', 'limit'];

	// loop over removeFields and deletethem from reqQuery
	removeFields.forEach(param => delete reqQuery[param]);

	// create query string
	let queryString = JSON.stringify(req.query);

	// replace takes a regex and an optional functional to create operators ($gt, $gte, etc)
	queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

	// finding resource
	// .populate adds the virtual property "courses" so each bootcamp displays its associated courses
	query = model.find(JSON.parse(queryString)).populate('courses'); 

	// prep search query for "select" fields
	if(req.query.select) {
		// format URL to match mongoose formula
		const fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	// sort
	if(req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		// default sorting is descending based on createdAt field
		query = query.sort('-createdAt')
	}

	// pagination
	const page = parseInt(req.query.page, 10) || 1; // default page is first page
	const limit = parseInt(req.query.limit, 10) || 25; // default number of returns per page is 100
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await model.countDocuments();

	query = query.skip(startIndex).limit(limit);

	// executing query
	const results = await query;
	
	// pagination result
	const pagination = {}

	if(endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit: limit
		}
	}

	if(startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit: limit
		}
	}
}

 module.exports = advancedResults