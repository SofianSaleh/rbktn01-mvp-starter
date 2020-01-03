import React, { Component } from "react";

class Players extends Component {
  constructor(props) {
    super(props);
    this.state={
        matchDay: null
    }
  }

  changeHandler(e){
    this.setState({
        [e.target.name]: e.target.value
      });
  }

  submitNumber(){
      console.log(this.state.matchDay)
    this.props.match(this.state.matchDay)
  }
  render() {
    return (
      <div>
          <center>
          <h3>English Premier League Match Day</h3>

            <br/>
              <label htmlFor="matchDay">Enter the Match Day: </label>
              <input type="number" name='matchDay' value={this.state.matchDay} id="matchDay" onChange={this.changeHandler.bind(this)}/>
              <button type="submit" onClick={this.submitNumber.bind(this)}> Submit</button>
        <table style={{ border: "thin solid #d3d3d3" }}>
          <thead>
            <tr style={{ backgroundColor: "#d3d3d3" }}>
              <th>Home</th>
              <th>Score Home</th>
              <th>Score Away</th>
              <th>Away</th>
            </tr>
          </thead>
          <tbody>
            {this.props.matches.map((match, idx) => {
              return (
                <tr>
                  <td>{match.homeTeam.name}</td>
                  {match.score.fullTime.homeTeam >= 0 ? (
                    <td>{match.score.fullTime.homeTeam}</td>
                  ) : null}
                  {match.score.fullTime.awayTeam >= 0 ? (
                    <td>{match.score.fullTime.awayTeam}</td>
                  ) : null}
                  <td>{match.awayTeam.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </center>
      </div>
    );
  }
}

export default Players;
