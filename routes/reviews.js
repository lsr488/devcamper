const express = require('express');
const { 
	getReviews,
	getReview
} = require('../controllers/reviews');

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

// Middleware
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
	.route('/')
		.get(advancedResults(Review, {
			path:'bootcamp', // provides the whole object to be displayed
			select: 'name description' // selects which properties to actually be displayed
		}), 
		getReviews
);

router.route('/:id')
	.get(getReview);

module.exports = router;