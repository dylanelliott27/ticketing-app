import React, {Component} from 'react';
import Nav from '../nav/nav';
import DashboardNav from '../nav/dashboardnav';
import {Link} from 'react-router-dom';
export default class Ticket extends Component{
    constructor(props){
        super(props);

        this.state = {
            activeTicket: []
        }
    }
    render(){
        const ticketinfo = this.props.location.state;
        return(
            <div className="container">
                <Nav username={this.props.username}/>
                <DashboardNav />
                <div className="pagecontainer">
                    <div className="ticketcard">
                        <h1>Name:</h1>
                        <p>{ticketinfo.name}</p>
                        <h2>Description:</h2>
                        <p>{ticketinfo.description}</p>
                        <h3>ID:</h3>
                        <p>{ticketinfo._id}</p>
                        <Link to="/dashboard"><button>Back to Dashboard</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}
