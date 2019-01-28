import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Card, Input, Button } from "antd";
import Fetch from "../helpers/fetch";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      const Url = "/login";
      const body = JSON.stringify(this.state);
      const res = await Fetch(Url, { body });
      if (res.success) {
        sessionStorage.setItem("token", res.token);
        this.handleChangeState("redirect", true);
      } else {
        alert("username or password incorrect");
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/homepage" />;
    }
    return (
      <Card title="Login" style={{ width: 400 }}>
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
        <br />
        <Link to="/register">Click to Register</Link>
      </Card>
    );
  }
}

const style = {
  margin: 10
};
