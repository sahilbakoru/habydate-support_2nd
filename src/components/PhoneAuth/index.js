import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import InputPhone from "./InputPhone";
import PhoneButton from "./PhoneButton";
import "./App.css";
export default class Index extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={PhoneButton} />
        <Route path="/input_phone" component={InputPhone} />
      </Switch>
    );
  }
}