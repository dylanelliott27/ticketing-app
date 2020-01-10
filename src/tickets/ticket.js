import React, {Component} from 'react';
import Tickets from './tickets';
import Nav from '../nav/nav';
import {Link} from 'react-router-dom';
export default class Ticket extends Component{
    constructor(props){
        super(props);

        this.state = {
            activeTicket: []
        }
    }
    render(){
        const test = this.props.location.state;
        return(
            <div className="container">
                <Nav />
                <p>{test.description}</p>
                <p>{test.name}</p>
                <p>{test.id}</p>
                <Link to="/dashboard"><button>Back to Dashboard</button></Link>
            </div>
        )
    }
}
