import React, {Component} from 'react';
import Axios from 'axios';
import Nav from '../nav/nav';
import DashboardNav from '../nav/dashboardnav';

export default class Createticket extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: {},
            description: {},
            username: this.props.username,
            error: false,
            success: false
        }
    }
    render(){
        const handleDesc = (e) => {
            this.setState({description: e.target.value});
        }

        const submitTicket = async (e) => {
            const info = { name: this.state.username, description: this.state.description}
            e.preventDefault();
            await Axios.post('http://localhost:8081/addticket', info, {withCredentials: true} )
            .then(res => {
                if(res.data === "You can not open more than 5 tickets right now."){
                    this.setState({error: true, success: false});
                }
                else{
                    this.setState({success: true, error: false})
                }
            })
        }

          return (
                <div>
                    <div className="createcontainer">
                        <Nav username={this.state.username}/>
                        <DashboardNav/>
                        <div className="createcard">
                            {
                                this.state.error ? <h1 className="error">There are currently 5 or more tickets saved. Please go remove some and try again.</h1> : ""
                            }
                                                    {
                                this.state.success ? <h1 className="success">Ticket has been successfully added</h1> : ""
                            }
                            <form className="createform">
                                <label>Please describe the situation:</label>
                                <input onChange={(e) => handleDesc(e)}></input>
                                <button onClick={(e) => submitTicket(e)}>Submit</button>
                            </form>
                        </div>
                    </div>
              </div>
          );
    }
}