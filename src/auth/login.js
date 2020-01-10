import React, { Component } from 'react';
import Axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';


class Login extends Component {
    constructor(){
        super();

        this.state={
            username: {},
            password: {},
            auth: false
        }
    }
  render() {
      const userInput = (e) => {
        this.setState({username: e.target.value});
      }


      const loginReq = (e) => {
          e.preventDefault();
          Axios.post('http://localhost:8081/loginrequest', {username: this.state.username, password: this.state.password},{withCredentials: true,})
          .then(res => {
              if(res.status === 200){
                this.setState({auth: true});
              }
              else{
                console.log(res.data);
              }
          })
      }


      const userPass = (e) => {
          this.setState({password: e.target.value});
      }


      if(this.state.auth === true){
        return <Redirect to={{
          pathname: '/dashboard',
          state: this.state.username
          }}/>
      }


    return (
      <Container maxWidth="xs">
        <h1 align="center">
          Sign in
        </h1>
                <InputLabel htmlFor="username">Username</InputLabel>
                <TextField onChange={userInput}type="text" className="form-control" id="username" />
                <InputLabel htmlFor="password">Password</InputLabel>
                <TextField  onChange={userPass} type="text" className="form-control" id="password" />
                <Button type="submit" fullWidth color="primary" variant="contained" onClick={loginReq}>Log in</Button>
              <p>
                If you forget your login info, contact system admin.
              </p>
            </Container>
  );
  }
}

export default Login; 