import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {Route, Redirect} from 'react-router-dom';
const LoginRedirect = ({component: Component, ...rest}) => {
    const [isAuth, setAuth] = useState(false);
    const [loading, loadingComplete] = useState(false);

    useEffect( () => {
        const loggedIn = async () => {
            try{
            const result = await Axios.get('http://localhost:8081/authentication', {withCredentials: true});
            if(result.data === true && loading === false){
                console.log(result);
                setAuth(true);
                loadingComplete(true);
            }
            if(result.data === false){
                console.log(result);
                setAuth(false);
            }
        }
        catch(e){
            console.log(e);
        }
            loadingComplete(true);
        }
        loggedIn();

    }, [])
    if(loading === true){
        return(
            <Route {...rest} render={props => (
                isAuth === false ?
                    <Component {...props} />
                : <Redirect to="/dashboard" />
            )} />
        );
    }
    else if(loading === false){
        return(
            <div>Loading</div>
        )
    }
}

export default LoginRedirect