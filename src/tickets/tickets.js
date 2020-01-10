import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
class Tickets extends Component{
    constructor(props){
        super(props);

     
    }
    
    render()
    {
        console.log(this.props.tickets)
        return(
            <div className="container">
                {this.props.tickets === null && <p>loading</p>}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="description">Description</th>
                            <th scope="view">View ticket</th>
                            <th scope="delete">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tickets && this.props.tickets.map(ticket => (
                            <tr key={ticket._id}>    
                                <td>{ticket.name}</td>
                                <td>{ticket.description}</td>
                                <td>
                                        <Link to=
                                        {{pathname: "/tickets/"+ticket._id,
                                        state: ticket}}>
                                        View</Link>
                                </td>
                                <td>
                                
                                        <button onClick={async() => await this.props.deleteItem(ticket)}>X</button>
                                </td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Tickets; 