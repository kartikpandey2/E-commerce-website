import React, { Component } from 'react';
import Thumbnail from './Thumbnail.js';
import Category from './Category.js';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './homepage.css'



export default class Homepage extends Component{
	constructor(props){
		super(props);
		this.state = {
			item:[],
			login:true
		}
		this.handleLogout = this.handleLogout.bind(this)
	}

	handleLogout(){
		sessionStorage.setItem('token','');
		this.setState({login:false})
	}

	componentDidMount(){
		var Url = "http://localhost:8000/items";
	    fetch(Url,
	    {
	      method: "GET",
	      headers : { 
	        'Accept': 'application/json',
	        'x-access-token': sessionStorage.getItem('token')
	       }
	    })
	    .then((res)=> res.json())
	    .then((result)=>{
	    	this.setState({item:result.data})
	    })
	}

    render(){
    	const Display = this.state.item.map((item,index)=>{
   			return (<Thumbnail key={item.Name} name={item.Name} price={item.Price} image={item.ImageUrl} ></Thumbnail>)
   		})

   		if(!this.state.login){
   			return(<Redirect to='/' />)
   		}


    	return(<div className="main-contaniner">
    			<div className="dnavbar">
    				<span className="brand">
    					<h3><b>E-Commerce Website</b></h3>
    				</span>
    				<div className="logout">
    					<Button bsStyle="link" style={{color:'black'}} onClick={this.handleLogout}>Logout </Button>
    				</div>
    			</div>
    			<div className="category-container">
    				<Category />
    			</div>
	    		<div className="display-container">
	    			{Display}
	    		</div>
    		</div>)
    }
}