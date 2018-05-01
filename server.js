const User = require('./Database/database.js').User;
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const bcrypt   = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Mongostore = require('connect-mongo')(session);
const port=process.env.PORT || 8000;
const dbURL=process.env.MONGODB_URI || 'mongodb://localhost/ecommerce';
const cors = require('cors');
const paypal = require('paypal-rest-sdk');
const path = require('path');

const saltRounds = 10;
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session(
{
secret:'iamkartik',
store: new Mongostore(
{url:dbURL,
ttl:14*24*60*60}),
resave: false ,
saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "client", "build")))
app.use(passport.initialize());
app.use(passport.session()); 
app.use(cors());


//paypal config

paypal.configure({
	  'mode': 'sandbox',
	  'client_id': 'AYbdPFUqxQDU65hpuyEAxEx2x6byR2jbKB9-49u4flaKyV9XTyhVq0YRm2SzqbjXyYYNEZsjSwedOwD7',
	  'client_secret': 'EA1VMVDODwDBkH5lv3ZUmtXLtQtzvdGQ4RSQeSh03p6aDw5b6yOUiquk7WoEzePHHtonlgdfF7bQ9Shz'
	})



passport.use(new LocalStrategy(function(username,password,done){
	User.findOne({'Local.Username':username},function(err,user){
		if(err){
			return done(err);
		}
		if(!user){
			return done(null, false, { message: 'Incorrect username or password.' });
		}
		//console.log(user.Local.Password)
		bcrypt.compare(password, user.Local.Password, function(err, result) {
         if(err)
		 {
			 console.log(err);
		 }
		 if(result){
			return done(null, user); 
		 }
		 return done(null, false);
		});
		
	})
}));

passport.serializeUser(function(user, done) {  
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


//routes

app.post('/register',function(req,res){
	//getting data
	 username = req.body.username
	 password = req.body.password
	 firstName = req.body.firstName
	 lastName = req.body.lastName
	 console.log(req.body.username,req.body.password,req.body.firstName,req.body.lastName)
	 //if data is not empty
	if(username&&password&&firstName&&lastName)
		{
			var new_user = User();
			new_user.Local.FirstName = firstName;
			new_user.Local.LastName = lastName;
			new_user.Local.Username = username;
			//hashing password
			bcrypt.hash(password,null,null, function(err, hash) {
				if(err)
				{
					 console.log(err);
				}
				else{
				 	new_user.Local.Password = hash;
				}
			})
			//saving data
			new_user.save(function(err){
				if(err){
					res.send({success:false,msg:err});
					console.log(err)
				}
				else
					console.log('working')
				{res.send({success: true, msg: 'Successful user registration'})}
			})	 
		}
		// if data is empty
		else{
			res.send({success: false, msg: 'enter all fields'})
		}
})


app.get('/fail',function(req,res){
	res.send({success: false, msg: 'login failed'})
})

app.post('/login',passport.authenticate('local',{ failureRedirect: '/fail' }),function(req,res){
	//setting session
	req.session._id = req.user._id;
	res.send({success: true, msg: 'Login Successful'});
});

app.post('/pay',(req,res)=>{
	const create_payment_json = {
	    "intent": "sale",
	    "payer": {
	        "payment_method": "paypal"
	    },
	    "redirect_urls": {
	        "return_url": "http://localhost:3000/success",
	        "cancel_url": "http://localhost:3000/cancel"
	    },
	    "transactions": [{
	        "item_list": {
	            "items": [{
	                "name": "item",
	                "sku": "item",
	                "price": "10.00",
	                "currency": "INR",
	                "quantity": 1
	            }]
	        },
	        "amount": {
	            "currency": "INR",
	            "total": "10.00"
	        },
	        "description": "testing"
	    }]
	};

	paypal.payment.create(create_payment_json, function (error, payment) {
	    if (error) {
	        console.log( error);
	    } else {
	        for(let i=0;i<payment.links.length;++i){
	        	if(payment.links[i].rel === 'approval_url'){
	        		res.header("Access-Control-Allow-Origin", "*");
 					res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	        		res.send({success: true,link:payment.links[i].href});
	        	}
	        }
	    }
	});

})

app.post('/success',(req,res)=>{
	const payerID = req.query.PayerID;
	const paymentId = req.query.paymentId
	const execute_payment_json = {
	    "payer_id": payerID,
	    "transactions": [{
	        "amount": {
	            "currency": "INR",
	            "total": "10.00"
	        }
	    }]
	};


	paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
		if (error) {
		    console.log(error.response);
		    throw error;
		} else {
		    console.log("Get Payment Response");
		    console.log(JSON.stringify(payment));
		    res.send({success: true, msg: 'Payment acknowledged'});
		}
	});
	
})

app.get('/cancel',()=>{
	res.send({success: false, msg: 'Payment Canceled'});
})


app.get('/logout',function(req,res){
	req.logout();
	req.session.destroy(function(err){
		console.log(err);
	})
	res.send({success:true})
});

app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//server listening
app.listen(port,function(){
	console.log(`Server is running at port:${port}`);
});

//function

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
	{
		return next();
	}   
	else{ 
	res.send('please login');}
   
}

