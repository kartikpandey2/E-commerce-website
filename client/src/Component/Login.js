import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Redirect ,Link} from 'react-router-dom';


export default class Login extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      username:'',
      password:'',
      redirect:false
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername(event){
    this.setState({username:event.target.value});
  }

  handlePassword(event){
    this.setState({password:event.target.value});
  }

  handleSubmit(event){
    var Url = "/login";
  
    fetch(Url,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username":this.state.username,
        "password":this.state.password
      })
    })
    .then((res)=>{ 
      return res.json(); })
    .then((data)=>{
        if(data.success){
          this.setState({redirect:true})
      }
      else{
        alert('username or password incorrect')
      }
    })
    .catch((err)=>{
      throw err
    })
  }

  render() {
    if(this.state.redirect){
            return(<Redirect to='/homepage' />)
        }
      return (
        <div>
          <MuiThemeProvider>
            <div>
            <AppBar
               title="Login"
             />
             <TextField
               hintText="Enter your Username"
               floatingLabelText="Username"
               onChange = {this.handleUsername}
               />
             <br/>
               <TextField
                 type="password"
                 hintText="Enter your Password"
                 floatingLabelText="Password"
                 onChange = {this.handlePassword}
                 />
               <br/>
               <RaisedButton label="Submit" primary={true} style={style} onClick={this.handleSubmit}/>
           </div>
            <Link to="/register">Click to Register</Link>
           </MuiThemeProvider>
        </div>
      );
    }
}

const style = {
 margin: 15,
};
