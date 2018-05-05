import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Homepage from './Homepage';
import NotFound from './NotFound'

export default ()=>{
	return (<BrowserRouter>
		<Switch>
			<Route path ='/' exact component={Login} />
			<Route path ='/register' exact component={Register} />
			<Route path ='/homepage' exact component={Homepage} />
			<Route path ='/success'  component={Homepage} />
			<Route path ='*' exact component={NotFound} />
		</Switch>
	</BrowserRouter>)
}