import React, { Component } from "react";

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchDay: null,
      EPL: '',
      lig: '',
      cl:''
    };
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitNumber() {
    console.log(this.state.matchDay);
    this.props.match(this.state.matchDay);
  }

//  radioHandler(e){
//   this.setState({
//    [e.target.name] : e.target.value
//   },() => console.log([e.target.name] , e.target.value));
//  }

  render() {
    const buttonStyle1 = {borderRadius: "5px",  textAlign: "center", background:"#999999", color: 'white'} ;



    return (
      <div>
        <center>
          <h3>English Premier League Match Day</h3>
          <input type="radio" name="EPL" id="epl"  value='epl' onClick={this.radioHandler} onChange={this.changeHandler}/>
          EPL
          <input type="radio" name="cl" id="epl" value='cl' onClick={this.radioHandler} onChange={this.changeHandler}/>
          Champion League
          <input type="radio" name="liga" id="epl" value='liga' onClick={this.radioHandler} onChange={this.changeHandler}/>
          Lig BBVA
          <br />
          <label htmlFor="matchDay">Enter the Match Day: </label>
          <input
            type="number"
            name="matchDay"
            value={this.state.matchDay}
            id="matchDay"
            onChange={this.changeHandler.bind(this)}
          />
          
          <button type="submit" onClick={this.submitNumber.bind(this)} style={buttonStyle1}>
            {" "}
            Submit
          </button>
          <table style={{ border: "thin solid #d3d3d3" }}>
            <thead>
              <tr style={{ backgroundColor: "#d3d3d3" }}>
                <th>Home</th>
                <th>Score</th>
                <th>Away</th>
              </tr>
            </thead>
            <tbody>
              {this.props.matches.map((match, idx) => {
                return (
                  <tr>
                    <td>{match.homeTeam.name}</td>
                    {match.score.fullTime.homeTeam >= 0 &&
                    match.score.fullTime.awayTeam >= 0 ? (
                      <td>
                        {match.score.fullTime.homeTeam} -{" "}
                        {match.score.fullTime.awayTeam}
                      </td>
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
