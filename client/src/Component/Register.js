import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Redirect } from 'react-router-dom';
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      username:'',
      password:'',
      redirect:false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePassword =this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlefirst_name = this.handlefirst_name.bind(this);
    this.handlelast_name = this.handlelast_name.bind(this);
  }

  handleUsername(event){
    this.setState({username:event.target.value});
  }

  handlePassword(event){
    this.setState({password:event.target.value});
  }

  handlefirst_name(event){
    this.setState({first_name:event.target.value});
  }

  handlelast_name(event){
    this.setState({last_name:event.target.value});
  }

  handleSubmit(event){
    var Url = "/register";
  
    fetch(Url,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username":this.state.username,
        "password":this.state.password,
        "firstName":this.state.first_name,
        "lastName":this.state.last_name
      })
    })
    .then((res)=>{ return res.json(); })
    .then((data)=>{
        if(data.success){
          this.setState({redirect:true})
        }
        else{
          alert('enter all fields')
        }
      })
  }

  render() {
    if(this.state.redirect){
      return(<Redirect to='/' />)
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {this.handlefirst_name}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {this.handlelast_name}
             />
           <br/>
           <TextField
             hintText="Enter your username"
             type="email"
             floatingLabelText="username"
             onChange = {this.handleUsername}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {this.handlePassword}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={this.handleSubmit}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;