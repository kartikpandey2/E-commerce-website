const mongoose = require('mongoose');
const dbURL=process.env.MONGODB_URI || 'mongodb://localhost/ecommerce';
mongoose.Promise = Promise;
mongoose.connect(dbURL,function(err){
	if(err)
	{
		console.log(err);
	}
	else{
		console.log('connected to database');
	}
});


const reg_schema = mongoose.Schema({
	FirstName: {
		type: String
	},
	LastName: {
		type : String
	},
	Username : {
		type : String,
		unique:true
	},
	Password : {
		type : String
	}
})

const User = mongoose.model('User',reg_schema);

exports.User = User;

const Item = mongoose.Schema({
	Name: {
		type: String
	},
	Price: {
		type : String
	},
	ImageUrl : {
		type : String
	}
})

const Items = mongoose.model('Items',Item)

exports.Items = Items;