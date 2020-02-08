import React, {Component} from 'react';
import Tickets from '../tickets/tickets';
import Nav from '../nav/nav';
import axios from 'axios';
import DashboardNav from '../nav/dashboardnav';
export default class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: this.props.username,
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
        this.setState({tickets: person})
    }
    addNewTicket(passedTicket){
        const arraytest = [...this.state.tickets]
        arraytest.push(passedTicket)
        this.setState({tickets: arraytest})
    }
    async componentDidMount(){
        const tickets = (await axios.get('http://localhost:8081/')).data;
        this.setState({tickets: tickets})
    }
    openModal(){
        this.setState({openModal: !this.state.openModal})
    }
    render(){
        return(
            <div className="dashcontainer">
                <Nav username={this.state.username}/>
                <DashboardNav username={this.state.username} />
                <Tickets deleteItem={this.deleteItem} tickets={this.state.tickets} addTicket={this.addTicket} user={this.state.username} />
                
                
            </div>
        )
    }
}