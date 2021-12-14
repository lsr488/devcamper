const express = require('express');

// bring in controller methods
const { 
	getCourses
} = require('../controllers/courses')

const router = express.Router();

router.route('/').get(getCourses);

module.exports = router;