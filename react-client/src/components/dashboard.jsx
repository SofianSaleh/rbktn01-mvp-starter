import React, { Component } from "react";
import $ from "jquery";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import Players from "./player.jsx";
import data from '../../../dummy_data.js'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      position: "",
      contract: "",
      error: "",
      changeMatches: false,
      changeTeam: true,
      matches: [],
      player:[]
    };
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.name === "" ||
      this.state.age === "" ||
      this.state.position === "" ||
      this.state.contract === ""
    ) {
      this.setState({ error: "PLEASE FILL ALL THE FIELDS" });
      return;
    }

    $.ajax({
      url: "/team",
      type: "POST",
      data: this.state,
      success: data => {
        if (data === "Player Added") {
          this.setState({ error: "" });
        } else {
          this.setState({ error: "Player Exists" });
        }
      },
      error: err => {
        console.log("err", err);
      }
    });
  }

  fetchMatches(num) {
    $.ajax({
      headers: { "X-Auth-Token": "afe52fa885ed4fc7b9226049df95127b" },
      url:
        `https://api.football-data.org/v2/competitions/PL/matches?matchday=${num}`,
      dataType: "json",
      type: "GET",
      success: response => {
        this.setState({
          matches: response.matches
        });
      }
    });
  }

  changeToMatches() {
    this.setState({
      changeMatches: true,
      changeTeam: false
    });
  }

  changeToTeam() {
    this.setState({
      changeMatches: false,
      changeTeam: true
    });
  }

  componentDidMount() {
    $.ajax({
      url: "/team",
      type: "GET",
      success: data => {
        var arr=[]
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i])
        }
        this.setState({
          player: arr
        })
      },
      error: err => {
        console.log("err", err);
      }
    });
  }

  render() {
    const navBar = {
      display: "inline",
      textAlign: "right",
      marginRight: "150px"
    };

    const labels = {
      margin: "0 0 3px 0",
      padding: "0px",
      display: "block",
      fontWeight: "bold"
    };

    const forms = {
      margin: "10px auto",
      maxWidth: "400px",
      padding: "20px 12px 10px 20px",
      font: '13px "Lucida Sans Unicode", "Lucida Grande", sans-serif',
      color: "#555",
      border: "1px solid #ccc",
      borderRadius: "1px",
      padding: "5px"
    };

    return (
      <div>
        <div style={navBar}>
          <NavLink className="btn" to="/signin">
            Logout
          </NavLink>
        </div>
          <center>
        <h1>Welcome {this.props.location.state.username}</h1>{this.state.teams}
        <button type="submit" onClick={this.changeToMatches.bind(this)}>
          Matches
        </button>
        <button type="submit" onClick={this.changeToTeam.bind(this)}>
          Your Team
        </button>
      <br/>
        {this.state.changeTeam ? 
        <div>
        <br/>
          <form onSubmit={this.handleSubmit.bind(this)} style={forms}>
            <label htmlFor="Name" style={labels}>
              Name:{" "}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange.bind(this)}
              />
            <br />
            <label htmlFor="Age" style={labels}>
              Age:{" "}
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={this.state.age}
              onChange={this.handleChange.bind(this)}
              />
            <br />
            <label htmlFor="Position" style={labels}>
              Position:{" "}
            </label>
            <input
              type="text"
              name="position"
              id="Position"
              value={this.state.position}
              onChange={this.handleChange.bind(this)}
              />
            <br />
            <label htmlFor="contract" style={labels}>
              contract Valid until:{" "}
            </label>
            <input
              type="date"
              name="contract"
              id="contract"
              value={this.state.contract}
              onChange={this.handleChange.bind(this)}
              />
            <br />
            <button type="submit" onClick={this.componentDidMount()}>Add</button>
            <p>{this.state.error}</p>
          </form>
       
        <center>
<table style={{ border: "thin solid #d3d3d3" }}>
        <thead>
          <tr style={{ backgroundColor: "#d3d3d3" }}>
            <th>Name</th>
            <th>Age</th>
            <th>Position</th>
            <th>Contract</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          </tr>
          {this.state.player.map((playe, idx) => {
            return (
              <tr>
                <td>{playe.name}</td>
                <td>{playe.age}</td>
                <td>{playe.position}</td>
                <td>{playe.contract}</td>
              </tr>
            );
          })}
          {data.map((playe, idx) => {
            return (
              <tr>
                <td>{playe.name}</td>
                <td>{playe.age}</td>
                <td>{playe.position}</td>
                <td>{playe.contract}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </center>
    </div>
        
        :
        <Players matches={this.state.matches} match={this.fetchMatches.bind(this)}/>}
        </center>
      </div>
    );
  }
}

export default Dashboard;
