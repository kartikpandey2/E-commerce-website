import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './thumbnail.css';


export default class Thumbnail extends Component{
    constructor(props){
    	super(props)
    	this.handleBuy = this.handleBuy.bind(this)
    }

    handleBuy(){
	    var Url = "/pay";
	    fetch(Url,
	    {
	      method: "POST",
	      headers : { 
	        'Accept': 'application/json',
	       }
	    })
	    .then((res)=>{ 
	    	return res.json();
	    })
	    .then((data)=>{
	    	console.log(data)
	    	window.location = data.link;
	    })
	    .catch((err)=>{
	    	throw err
	    })
    }

	render(){
		return(
			<div className="thumbnail">
				<div className="image-div">
					<img src={this.props.image} alt="" width="130" height="110"/ >
				</div>
				<div className="content">
					<h5>{this.props.name}</h5>
					<h6>{`Price : ${this.props.price}`}</h6>
					<Button bsStyle="primary" onClick={this.handleBuy}>Buy Now</Button>
				</div>
			</div>
		)
	}

}



