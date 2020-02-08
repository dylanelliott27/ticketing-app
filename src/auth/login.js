import React, { Component } from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';



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
      <div className="containerc" >
        <div className="logincard">
        <p className="loginheader">
          Sign in to your account
        </p>
        <hr></hr>
              <input className="usernamebox" onChange={userInput}type="text" id="username" placeholder="Username" />
              <input className="passwordbox" onChange={userPass} type="text" id="password" placeholder="Password" />
              <div className="buttoncontainer">  
                <button className="loginbutton" type="submit" color="primary" variant="contained" onClick={loginReq}>Log in</button>
                <button className="loginbutton" type="submit" color="primary" variant="contained" onClick={loginReq}>Guest Login</button>
              </div>
              <p className="disclaimer">
                Login with = User: guest || Password: guest
              </p>
        </div>
        </div>
  );
  }
}

export default Login; 