import React, { Component } from 'react';
import Tickets from './tickets/tickets';
import Login from './auth/login';
import Ticket from './tickets/ticket';
//import Axios from 'axios';
import PrivateRoute from './auth/auth';
import Dashboard from './dashboard/dashboard';
import {Route, Switch, withRouter} from 'react-router-dom';
import Createticket from './tickets/createticket';
import Livechat from './tickets/livechat';
import LoginRedirect from './auth/loginredir';
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
        <LoginRedirect exact path="/" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/tickets/:id" component={Ticket} />
        <PrivateRoute path="/tickets" component={Tickets} />
        <PrivateRoute path="/createticket" component={Createticket} />
        <PrivateRoute path="/live-chat" component={Livechat} />
        <LoginRedirect path="/login" component={Login} />
      </Switch>
    );
  }
}

export default App;