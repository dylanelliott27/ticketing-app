import Axios from "axios";
import React, {useState, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const [authenticated, setAuthentication] = useState(null);
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [name, setName] = useState("");
    
    useEffect(
        () => {
            const isLogin = async () => {
                try {
                    const result = await Axios.get('http://localhost:8081/authentication', {withCredentials: true});
                    console.log(result.status);
                    if(result.status === 500){
                        
                        console.log("auth false");

                    }
                    else if(result.status === 200){
                        const fetchedName = result.data.username;
                            
                            setName(fetchedName);
                            setAuthentication('True');
                    }
                } catch (e) {
                    console.log(e);
                    setAuthentication('false');
                   
                }
                setLoadingComplete(true);
            }   
            isLogin();
        },
        [rest.path]
    );

if(loadingComplete){
    return (
        <Route {...rest} render={props => (
         authenticated === 'True' ?
        <Component {...props} username={name} />
                         //passes fetched name to requested component
        : <Redirect to="/login" />
        )} />
    );
}
    else{
        return ( <div> Loading... </div>);
    }
};

export default PrivateRoute;
