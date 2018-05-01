import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './category.css'

function Item(props){
	return(
			<div className="item">
				<Button bsStyle="link">{props.name} </Button>
			</div>
		)
}

export default class Category extends Component{
	constructor(props){
		super(props);
		this.state = {
			category:data
		}
	}

    render(){
    	const Display = this.state.category.map((category,index)=>{
   			return (<Item key={category.Name} name={category.Name}></Item>)
   		})

    	return(<div className="category-div">
    			<h4><b>Category</b></h4>
    			{Display}
    		</div>)
    }
}

const data =[{
		Name:"SPORTSWEAR",
	},
	{
		Name:"MENS",		
	},
	{
		Name:"WOMENS",
	},
	{
		Name:"KIDS",
	},
	{
		Name: "ELECTRONICS",
	},
	{
		Name: "HOUSEHOLD",
	},
	{
		Name: "FURNITURE",
	},
	{
		Name:"DECOR",
	},
	{
		Name: "BOOKS",
	},
	{
		Name: "GLOBAL STORE",
	},
]