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
                    if(result.status === 500){
                        setAuthentication('False');
                        console.log(false);
                    }
                    else if(result.status === 200){
                        //storing fetched username into state
                        const fetchedName = result.data.username;
                        setName(fetchedName);
                        setAuthentication('True');
                    }
                } catch (e) {
                    console.log(e);
                }
                setLoadingComplete(true);
            }   
            isLogin();
        },
        []
    );
    if(loadingComplete){
        return (
            <Route {...rest} render={props => (
                authenticated === 'True' ?
                    <Component {...props} name={name} /> //passes fetched name to requested component
                : <Redirect to="/login" />
            )} />
        );
    }else{
        return ( <div> Loading... </div>);
    }
};

export default PrivateRoute;
