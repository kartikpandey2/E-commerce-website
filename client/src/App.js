import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Homepage from "./Component/Homepage";
import NotFound from "./Component/NotFound";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/homepage" exact component={Homepage} />
          <Route path="/success" component={Homepage} />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
