import React, { Component } from "react";
import $ from "jquery";
import { Redirect, Route } from "react-router-dom";
// import dashboard from './dashboard/jsx'

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
      error: "",
      redirectToSignUp: false
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.username === "" || this.state.password === "") {
      this.setState({ error: "PLEASE FILL ALL THE FIELDS" });
      return;
    }

    $.ajax({
      url: "/signin",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(this.state),
      success: data => {
        if (data === "successAuth") {
          this.setState({ error: "" });
          this.setState({ redirect: true });
        } else {
          this.setState({ error: "USERNAME OR PASSWORD IS INCORRECT" });
        }
      },
      error: err => {
        console.log("err", err);
      }
    });
  }

  redirectToSignUp(){
	this.setState({
	    redirectToSignUp: true
	}) 
 }

  render() {
    const form = { marginTop: "100px" };
    const formStyle = { width: "25%", textAlign: "left" };
    const buttonStyle1 = {
      width: "100%",
      marginTop: "10px",
      color: "white",
      fontSize: "20px",
      padding: "7px",
      textAlign: "center",
      background: "#2196f3"
    };
    const errors = {
      marginTop: "10px",
      color: "red",
      fontSize: "30px",
      padding: "7px",
      textAlign: "center"
    };

    if(this.state.redirectToSignUp){
        this.setState({
            redirectToSignUp: false
        })
        return  <Redirect to={{
          pathname: '/',
          
        }} />
    }

    if (this.state.redirect) {
      return (
        <div>
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { username: this.state.username }
            }}
          />
        </div>
      );
    }

    return (
      <div style={form}>
        <center>
          <form
            className="form-group"
            style={formStyle}
            onSubmit={this.handleSubmit.bind(this)}
          >
            <div>
              <label>Username</label>
              <input
                className="form-control"
                type="text"
                value={this.state.username}
                name="username"
                placeholder="Enter username"
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                value={this.state.password}
                name="password"
                placeholder="Enter your password"
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <center>
              <button style={buttonStyle1} type="submit">
                Sign In
              </button>
              <a  onClick={this.redirectToSignUp.bind(this)}>Don't Have an Account</a>
            </center>
            <br />
            <p style={errors}>{this.state.error}</p>
          </form>
        </center>
      </div>
    );
  }
}

export default SignIn;
