const mongoose = require('mongoose');
const tokenSchema = mongoose.Schema({
    mail : String,
	token : String
});
module.exports = mongoose.model('Token' , tokenSchema);