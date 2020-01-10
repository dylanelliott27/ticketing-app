import React, {Component} from 'react';
import Axios from 'axios';
import FormDialog from './createticketmodal'
export default class Createticket extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: {},
            description: {},
            username: this.props.user
        }
    }
    render(){
        const handleTitle = (e) => {
            e.preventDefault();
            this.setState({title: e.target.value});
        }
        const handleDesc = (e) => {
            this.setState({description: e.target.value});
        }
        const submitTicket = async (e) => {
            const info = { name: this.state.username, description: this.state.description}
            e.preventDefault();
            await Axios.post('http://localhost:8081/addticket', info, {withCredentials: true} )
            .then(res => {
                const returnedInfo = res.data;
                this.props.addNewTicket(returnedInfo);
            })
        }
        console.log("createticket:" +this.props.openModalState)
          return (
            <FormDialog openModalState={this.props.openModalState} openModal={this.props.openModal} handleTitle={handleTitle} handleDesc={handleDesc} submitTicket={submitTicket} />
          );
    }
}