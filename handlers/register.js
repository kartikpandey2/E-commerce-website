const User = require('../models/database.js').User;
const bcrypt = require('bcrypt-nodejs');


module.exports = (req,res)=>{
	//getting data
	const username = req.body.username
	const password = req.body.password
	const firstName = req.body.firstName
	const lastName = req.body.lastName
	 //if data is not empty
	if(username&&password&&firstName&&lastName){
		const new_user = User();
		new_user.FirstName = firstName;
		new_user.LastName = lastName;
		new_user.Username = username;
		//hashing password
		bcrypt.hash(password,null,null, function(err, hash) {
			if(err){
				console.log(err);
			}
			else{
			 	new_user.Password = hash;
			}
		})
		//saving data
		new_user.save(function(err){
			if(err){
				if(err.code === 11000){
					res.send({success:false,msg:"Username taken"});
				}
				else{
					res.send({success:false,msg:err});
					console.log(err)
				}
			}
			else{
				res.send({success: true, msg: 'Successful user registration'})
			}
		})	 
	}
		// if data is empty
	else{
		res.send({success: false, msg: 'enter all fields'})
	}

}