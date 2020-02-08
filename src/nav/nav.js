import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

function Nav(props) {
  const logout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    props.history.push('/login');
  }
  const [navToggle, setNavToggle] = useState(false);
  return (
    <nav className="navi">
      <p className="navbrandname">Workplace Management</p>
      <i onClick={() => setNavToggle(!navToggle)} className="fas fa-bars"></i>
      <ul className={navToggle ? "mobilenav" : "useroptions"} >
        <li>My Profile</li>
        <li onClick={logout}>Logout</li>
        <li>Hello, {props.username}!</li>
      </ul>
    </nav>
  );
}

export default withRouter(Nav);