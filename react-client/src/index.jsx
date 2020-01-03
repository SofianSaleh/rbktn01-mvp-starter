import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import signUp from './components/signUp.jsx';
import signIn from './components/signIn.jsx';
import dashboard from './components/dashboard.jsx';

import { BrowserRouter, Route, Link, NavLink  } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  

  render () {
    return (
  
    <BrowserRouter>
      <div>
        <Route path="/" exact component={signUp} />
        <Route path="/signin" exact component={signIn} />
        <Route path="/dashboard" exact component={dashboard } />
      </div>

     </BrowserRouter>
     
  
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));