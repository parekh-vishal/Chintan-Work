const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	user_id : {type : String},
    firstName : {type:String, required : 'Please enter your first Name'},
    lastName : {type: String, required : 'Please enter your Last Name'},
    contactNo : {type : Number,required : 'Please enter your Contact No '},
    email : {type:String, required: 'Please enter your email',
	match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password : {type:String, required: 'Please enter your password.'}
});
module.exports = mongoose.model('User' , userSchema);