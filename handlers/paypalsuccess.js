const paypal = require('paypal-rest-sdk');

module.exports = (req,res)=>{
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
		    res.send({success: true, msg: 'Payment acknowledged'});
		}
	});
	
} 