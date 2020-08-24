const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	user_id : {type : String},
    firstName : {type:String, required : 'Please enter your first name'},
    lastName : {type: String},
    contactNo : {type : Number},
    password : {type:String, required: 'Please enter your password.'}
});
module.exports = mongoose.model('User' , userSchema);