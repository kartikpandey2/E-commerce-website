const User = require('../models/database.js').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
 

module.exports =  (req,res)=>{
	const username = req.body.username;
	const password = req.body.password;
	User.findOne({Username:username})
	.then((user)=>{
		bcrypt.compare(password, user.Password, function(err, result){
		  	if(result){
			   	let token = jwt.sign(
				   	{
				   		username,
				   		id : user.id
				   	},
				   	'abcdefghi',
			   	)
			   	res.send({success:true, message:'Login success', token})
		    }
		  	else{
		   		res.send({ success: false, message: 'Authentication failed. Wrong password.' });
		  	} 
		});
	})
	.catch((err)=>{
		console.log(err)
	})
}