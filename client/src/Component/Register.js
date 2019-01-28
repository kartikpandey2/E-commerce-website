import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Card, Input, Button } from "antd";
import Fetch from "../helpers/fetch";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      redirect: false
    };
  }

  handleChangeState = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  handleSubmit = async () => {
    try {
      const Url = "/register";
      const body = JSON.stringify(this.state);
      const res = Fetch(Url, { body });
      if (res.success) {
        this.handleChangeState("redirect", true);
      } else {
        alert("enter all fields");
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <Card title="Register" style={{ width: 400 }}>
        <Input
          placeholder="Enter your First Name"
          onChange={e => this.handleChangeState("first_name", e.target.value)}
          style={style}
        />
        <Input
          placeholder="Enter your Last Name"
          onChange={e => this.handleChangeState("last_name", e.target.value)}
          style={style}
        />
        <Input
          placeholder="Enter your Username"
          onChange={e => this.handleChangeState("username", e.target.value)}
          style={style}
        />
        <Input
          type="password"
          placeholder="Enter your Password"
          onChange={e => this.handleChangeState("password", e.target.value)}
          style={style}
        />
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Card>
    );
  }
}
const style = {
  margin: 15
};
export default Register;
