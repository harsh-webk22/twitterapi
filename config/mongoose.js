const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twitterapi');

const db = mongoose.connection;

db.on('error' , console.error.bind(console  , 'error while connectting to db'));
db.once('open'  , function(){console.log('db successfully connected')});

module.exports = db;