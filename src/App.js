import React, { Component } from 'react';
import Nav from './nav/nav';
import Tickets from './tickets/tickets';
import Login from './auth/login';
import Ticket from './tickets/ticket';
//import Axios from 'axios';
import PrivateRoute from './auth/auth';
import LoginRedirect from './auth/loginredir';
import Dashboard from './dashboard/dashboard';
import {Route, Switch} from 'react-router-dom';

class App extends Component {
  constructor(){
    super();

    this.state = {
      username: {}
    }
  }
  render() {

    return ( 
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/tickets/:id" component={Ticket} />
        <PrivateRoute path="/tickets" component={Tickets} />
        <LoginRedirect path="/login" component={Login} />
      </Switch>
    );
  }
}

export default App;