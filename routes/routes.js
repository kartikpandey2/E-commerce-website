const express = require('express');
const paypalpay = require('../handlers/paypalpay')
const paypalsuccess = require('../handlers/paypalsuccess')
const register = require('../handlers/register')
const login = require('../handlers/login')
const itemsdata = require('../handlers/itemsdata')
const jwt = require('jsonwebtoken');



module.exports = function routes(app){


	app.post('/register',register)


	app.get('/fail',function(req,res){
		res.send({success: false, msg: 'login failed'})
	})

	app.post('/login',login)

	app.post('/pay',check,paypalpay)

	app.post('/success',paypalsuccess)

	app.get('/cancel',(req,res)=>{
		res.send({success: false, msg: 'Payment Canceled'});
	})

	app.get('/items',itemsdata)

}


function check(req,res,next){
	const token = req.body.token || req.query.token || req.headers['x-access-token'] ;
	if(token){
		jwt.verify(token, 'abcdefghi', function(err, decoded) {
			if (err) {
        		return res.send({ success: false, message: 'Failed to authenticate token.' });    
      		}
  			else{
  				console.log(decoded);
  				req.decoded = decoded;
  				next();
  			}
		});
	}
	else{
		return(res.send({ success: false, message: 'No token provided.' }))
	}
}