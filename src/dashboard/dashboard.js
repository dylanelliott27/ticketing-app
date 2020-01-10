import React, {Component} from 'react';
import Tickets from '../tickets/tickets';
import Nav from '../nav/nav';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Createticket from '../tickets/createticket'
import axios from 'axios';
export default class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: this.props.name,
            tickets: null,
            openModal: false
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addNewTicket = this.addNewTicket.bind(this);
        this.openModal = this.openModal.bind(this);
    }
    async deleteItem(ticketToDelete){
        console.log(ticketToDelete._id);
        let test = await axios.post('http://localhost:8081/delete',{id: ticketToDelete._id}, {withCredentials: true})
        console.log(test);
        let person = this.state.tickets.filter(ticket => ticket._id!== ticketToDelete._id)
        console.log("after post");
        this.setState({tickets: person})
    }
    addNewTicket(passedTicket){
        const arraytest = [...this.state.tickets]
        console.log("addnewticket called")
        arraytest.push(passedTicket)
        this.setState({tickets: arraytest})
    }
    async componentDidMount(){
        const tickets = (await axios.get('http://localhost:8081/')).data;
        //this.addTicket(tickets);
        this.setState({tickets: tickets})
    }
    openModal(){
        this.setState({openModal: !this.state.openModal})
        console.log(this.state.openModal)
    }
    render(){
        console.log("dashboard being")
        return(
            <div className="container">
                <Nav />
                <h1 align="center">Hello, {this.state.username}!</h1>
                <p align="center">What would you like to do today?</p>
                <div className="actions" align="center">
                    <Button variant="outlined" color="primary" align="center">Admin Panel</Button>
                    <Button onClick={this.openModal} variant="outlined" color="primary" align="center">Create a Ticket</Button>
                </div>
                <Tickets deleteItem={this.deleteItem} tickets={this.state.tickets} addTicket={this.addTicket} user={this.state.username} />
                {this.state.openModal &&
                    <Createticket openModalState={this.state.openModal} openModal={this.openModal} addNewTicket={this.addNewTicket} user={this.state.username} />
                }
            </div>
        )
    }
}