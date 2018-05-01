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
		 var Url = "http://localhost:3000/logout";
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
		src:"pendrive.JPG",
		price:"10rs"
	},
	{
		Name:"IPhone",		
		src:"iPhone.JPG",
		price:"10rs"
	},
	{
		Name:"Macbook Pro",
		src:"macbook-pro.JPG",
		price:"10rs"
	},
	{
		Name:" Macbook Air",
		src:"macbook-air.JPG",
		price:"10rs"
	},
	{
		Name: "Tv",
		src:"TV.JPG",
		price:"10rs"
	},
	{
		Name: "Washing Machine",
		src:"Washing-Machine.JPG",
		price:"10rs"
	},
	{
		Name: "Bean Bag",
		src:"bean-bag.JPG",
		price:"10rs"
	},
	{
		Name:" Water Purifier",
		src:"water-purifier-1.JPG",
		price:"10rs"
	},
	{
		Name: "Table",
		src:"table.JPG",
		price:"10rs"
	},
	{
		Name: "Bed",
		src:"Bed.JPG",
		price:"10rs"
	},
]