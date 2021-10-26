const fs = require('fs');
const mongoose = require ('mongoose');
const dotenv = require('dotenv');

// load env vars
dotenv.config({ path: './config/config.env' });

// load models
const Bootcamp = require('./models/Bootcamp');

// connect to DB
mongoose.connect(process.env.MONGO_URI);

// read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// import into db
const importData = async () => {
	try {
		await Bootcamp.create(bootcamps);

		console.log('Data Imported...');
		process.exit();
	} catch (err) {
		console.error(err);
	}
}

// delete data from db
const deleteData = async () => {
	try {
		// deletes ALL data
		await Bootcamp.deleteMany();

		console.log('Data Destroyed...');
		process.exit();
	} catch (err) {
		console.error(err);
	}
}

if(process.argv[2] === '-import') {
	importData();
} else if(process.argv[2] === '-d') {
	deleteData();
}