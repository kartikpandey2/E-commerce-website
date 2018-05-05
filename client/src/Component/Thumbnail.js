import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './thumbnail.css';
import { Redirect } from 'react-router-dom';


export default class Thumbnail extends Component{
    constructor(props){
    	super(props)
    	this.state = {
    		redirect:false
    	}
    	this.handleBuy = this.handleBuy.bind(this)
    }

    handleBuy(){
	    var Url = "/pay";
	    fetch(Url,
	    {
	      method: "POST",
	      headers : { 
	      	'Content-Type': 'application/json',
	        'Accept': 'application/json',
	        'x-access-token': sessionStorage.getItem('token')
	       }
	    })
	    .then((res)=>{ 
	    	return res.json();
	    })
	    .then((data)=>{
	    	if(data.success){
	    		window.location = data.link;
	    	}
	    	else{
	    		alert('please login')
	    		this.setState({redirect:true})
	    	}
	    })
	    .catch((err)=>{
	    	throw err
	    })
    }

	render(){
		if(this.state.redirect){
   			return(<Redirect to='/' />)
   		}
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



