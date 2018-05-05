const Items = require('../models/database').Items

module.exports = ()=>{
	return new Promise((resolve,reject)=>{
		ItemDetail.map((item,index)=>{
			let Item = Items();
			Item.Name = item.Name;
			Item.Price = item.price;
			Item.ImageUrl = item.src;
	
			Item.save()
			.then(()=> {
				console.log('items save')
			})
			.catch((err)=>{
				console.log(err)
				reject(err)
			})
		})
		resolve()
	})	
} 




const ItemDetail =[{
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