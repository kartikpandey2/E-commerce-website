const paypal = require('paypal-rest-sdk');


module.exports = (req,res)=>{
	const create_payment_json = {
	    "intent": "sale",
	    "payer": {
	        "payment_method": "paypal"
	    },
	    "redirect_urls": {
	        "return_url": "https://damp-anchorage-37687.herokuapp.com/success",
	        "cancel_url": "https://damp-anchorage-37687.herokuapp.com/cancel"
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
	        		res.json({"success": true,"link":payment.links[i].href});
	        	}
	        }
	    }
	});

}