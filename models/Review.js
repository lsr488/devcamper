const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'Please add a title for the review'],
		maxlength: 100
	},
	text: {
		type: String,
		required: [true, 'Please add some text']
	},
	rating: {
		type: Number,
		min: 1,
		max: 10,
		required: [true, 'Please add a rating between 1 and 10']
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	bootcamp: {
		type: mongoose.Schema.ObjectId,
		ref: 'Bootcamp', // knows which model to reference
		required: true
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	}	
});

// limit 1 review per user per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);