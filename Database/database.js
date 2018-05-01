var mongoose = require('mongoose');
var dbURL=process.env.MONGODB_URI || 'mongodb://localhost/ecommerce';
mongoose.connect(dbURL,function(err){
	if(err)
	{
		console.log(err);
	}
	else{
		console.log('connected to database');
	}
});


var reg_schema = mongoose.Schema({
Local:{
		FirstName :  {
						type: String
					},
		LastName :  {
						type : String
					},
		Username :  {
						type : String,
						unique:true
					},
		Password :  {
						type : String,
					}
 	}
})

var User = mongoose.model('User',reg_schema);

exports.User = User;