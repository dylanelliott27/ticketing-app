import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Tickets extends Component{
    constructor(props){
        super(props);
    }
    
    render()
    {
        return(
            <div className="container">
                {this.props.tickets === null && <p>loading</p>}
                <table className="table">
                    <thead>
                        <tr className="underline">
                            <th scope="col">Name</th>
                            <th scope="description">Description</th>
                            <th scope="view">View ticket</th>
                            <th scope="delete">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tickets && this.props.tickets.map(ticket => (
                            <tr className="datatr" key={ticket._id}>    
                                <td className="firsttd">{ticket.name}</td>
                                <td>{ticket.description}</td>
                                <td>
                                        <Link to=
                                        {{pathname: "/tickets/"+ticket._id,
                                        state: ticket, user: this.props}}  style={{color: 'black'}}>
                                        <i className="fas fa-folder-open"></i></Link>
                                </td>
                                <td className="lasttd">
                                <i className="fas fa-trash-alt" onClick={async() => await this.props.deleteItem(ticket)}></i>
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