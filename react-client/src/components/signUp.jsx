import React from "react";
// import ListItem from './ListItem.jsx';
import { Redirect, Route } from "react-router-dom";
import $ from "jquery";
// import signIn from './signIn.jsx'
// import dashboard from './dashboard/jsx'


export class SignUp	 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: "",
	  redirect: false,
	  redirectToSignIn: false
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
      this.state.username === "" ||
      this.state.email === "" ||
      this.state.password === ""
    ) {
      this.setState({ error: "PLEASE FILL ALL THE FIELDS" });
      return;
    }

    $.ajax({
      url: "/signup",
      type: "POST",
      data: this.state,
      success: data => {
        console.log(data);
        if (data !== "user-exist") {
          this.setState({ redirect: true },()=>console.log(this.state.redirect));
        } else {
          this.setState({ error: "THE USER ALREADY EXISTS" });
        }
      },
      error: err => {
        console.log("err", err);
      }
    });
  }

  redirectToSignIn(){
	this.setState({
	    redirectToSignIn: true
	}) 
 }



  render() {
//////////////////////////////// S	T	Y	L	E	S ////////////////////////////////////////////////////
	const form= {marginTop:"100px"};
		const formStyle = {width:"25%", textAlign: "left"};
		const buttonStyle1 = {width:"100%",  marginTop:"10px", color:"white", fontSize:"20px", padding:"7px", textAlign: "center", background:"#2196f3"} ;
//////////////////////////////////////////////////// S	T	Y	L	E	S ////////////////////////////////////////////////////
	
//////////////////////////////////////////////////// RE	DI	RE	CT	IN	G ////////////////////////////////////////////////////
		if(this.state.redirectToSignIn){
			this.setState({
				redirectToSignIN: false
			})
			return  <Redirect to={{
			  pathname: '/signIn',
			  
			}} />
		}

		const errors={
			marginTop: "10px",
			color: "red",
			fontSize: "30px",
			padding: "7px",
			textAlign: "center",
		  }
    if(this.state.redirect){
		return (
			<div>
			<Redirect to={{
				pathname: '/dashboard',
				state: { username:  this.state.username }
			}} />
			</div>
		) 
    }
//////////////////////////////////////////////////// RE	DI	RE	CT	IN	G ////////////////////////////////////////////////////
    return (
      <div style={form}>
		  <center>
        <form className="form-group" style={formStyle} onSubmit={this.handleSubmit.bind(this)}>
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
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              value={this.state.email}
              name="email"
              placeholder="Enter your email"
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
            <button style={buttonStyle1} className="btn btn-primary"> Sign Up </button>
          </center>
          <br />
          <p style={errors}>{this.state.error}</p>
        </form>
		<a  onClick={this.redirectToSignIn.bind(this)}>Already I have account</a>
		</center>
      </div>
    );
  }
}

export default SignUp;
