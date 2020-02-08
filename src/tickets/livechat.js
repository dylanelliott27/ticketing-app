import React, {Component} from 'react';
import Nav from '../nav/nav';
import DashboardNav from '../nav/dashboardnav';
export default class Livechat extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: this.props.username
        }
    }
    render(){
          return (
              <div>
                <div className="createcontainer">
              <Nav username={this.state.username}/>
              <DashboardNav/>
                  <p>COMING SOON</p>
                </div>
                {console.log(this.props.username)}
              </div>
          );
    }
}