import React from 'react';
import {NavLink}from 'react-router-dom';

function DashboardNav(props) {
  return (
    <nav className="navidash">
      <ul className="dashboardoptions">
        <NavLink style={{textDecoration: 'none', fontSize: "25px", color: "black", fontFamily: "roboto"}} activeStyle={{borderBottom: "2px solid #274C77"}} to={'/dashboard'}><li>Tickets</li></NavLink>
        <NavLink style={{textDecoration: 'none', fontSize: "25px", color: "black", fontFamily: "roboto"}} activeStyle={{borderBottom: "2px solid #274C77"}} to={{pathname: '/live-chat'}}><li>Live-Chat</li></NavLink>
        <NavLink style={{textDecoration: 'none', fontSize: "25px", color: "black", fontFamily: "roboto"}} activeStyle={{borderBottom: "2px solid #274C77"}} to={{pathname:'/createticket'}}><li>Create Ticket</li></NavLink>
      </ul>
    </nav>
  );
}

export default DashboardNav;