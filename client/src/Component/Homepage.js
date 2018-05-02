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
			item:data,
			login:false
		}
		this.handleLogout = this.handleLogout.bind(this)
	}

	handleLogout(){
		 var Url = "/logout";
	    fetch(Url,
	    {
	      method: "GET",
	      headers : { 
	        'Accept': 'application/json',
	       }
	    })
	    .then((res)=>{ 
	    	return res.json();
	    })
	    .then((data)=>{
	    	if(data.success){
	    		this.setState({login:false})
	    	}
	    })
	    .catch((err)=>{
	    	throw err
	    })
	}

    render(){
    	const Display = this.state.item.map((item,index)=>{
   			return (<Thumbnail key={item.Name} name={item.Name} price={item.price} image={item.src} ></Thumbnail>)
   		})


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

const data =[{
		Name:"Pendrive",
		src:"pendrive.jpg",
		price:"10rs"
	},
	{
		Name:"IPhone",		
		src:"iPhone.jpg",
		price:"10rs"
	},
	{
		Name:"Macbook Pro",
		src:"macbook-pro.jpg",
		price:"10rs"
	},
	{
		Name:" Macbook Air",
		src:"macbook-air.jpg",
		price:"10rs"
	},
	{
		Name: "Tv",
		src:"TV.jpg",
		price:"10rs"
	},
	{
		Name: "Washing Machine",
		src:"Washing-Machine.jpg",
		price:"10rs"
	},
	{
		Name: "Bean Bag",
		src:"bean-bag.jpg",
		price:"10rs"
	},
	{
		Name:" Water Purifier",
		src:"water-purifier-1.jpg",
		price:"10rs"
	},
	{
		Name: "Table",
		src:"table.jpg",
		price:"10rs"
	},
	{
		Name: "Bed",
		src:"Bed.jpg",
		price:"10rs"
	},
]