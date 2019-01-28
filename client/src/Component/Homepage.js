import React, { Component } from "react";
import { Card, Button } from "antd";
import { Redirect } from "react-router-dom";
import "./homepage.css";
import Fetch from "../helpers/fetch";
import { Row, Col } from "antd";

const CardStyle = { width: 600, margin: 10 };

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      login: true
    };
  }
  async componentDidMount() {
    try {
      const Url = "/items";
      const res = await Fetch(Url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": sessionStorage.getItem("token")
        }
      });
      this.setState({ items: res.data }, () => {
        console.log(this.state);
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleChangeState = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  handleLogout = () => {
    console.log("hello");
    sessionStorage.setItem("token", "");
    this.handleChangeState("login", false);
  };

  handleBuy = async id => {
    try {
      const Url = "/register";
      const body = JSON.stringify({
        _id: id
      });
      const res = await Fetch(Url, {
        headers: {
          "x-access-token": sessionStorage.getItem("token")
        },
        body
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { items } = this.state;
    const NoData = () => <h3>No data</h3>;
    const Display = items.map((item, index) => {
      return (
        <Card key={item.Name} style={CardStyle}>
          <Row>
            <Col span={8}>
              <img src={item.ImageUrl} style={{ width: 200, height: 200 }} />
            </Col>
            <Col span={8} offset={4}>
              <h3>{item.Name}</h3>
              <h3>{item.Price}</h3>
              <Button type="primary" onClick={() => this.handleBuy(item._id)}>
                Buy
              </Button>
            </Col>
          </Row>
        </Card>
      );
    });

    if (!this.state.login) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Row>
          <Col span={8} offset={16}>
            <Button style={{ color: "black" }} onClick={this.handleLogout}>
              Logout
            </Button>
          </Col>
          <Row>
            <Col span={8} offset={6}>
              {!items.length && NoData()}
              {Display}
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
}
