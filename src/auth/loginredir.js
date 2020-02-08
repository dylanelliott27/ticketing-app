import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {Route, Redirect} from 'react-router-dom';

const LoginRedirect = ({component: Component, ...rest}) => {
    const [isAuth, setAuth] = useState(false);
    const [loading, loadingComplete] = useState(false);

    useEffect( () => {
        const loggedIn = async () => {
            console.log("loginredir performing");
            try{
            console.log("before axios req")
            const result = await Axios.get('http://localhost:8081/authentication', {withCredentials: true});
            console.log(result);
            if(result.status === 200 && loading === false){
               setAuth(true);
               console.log("is in first if block in loginredir")
                loadingComplete(true);
            }

            if(result.data === false){
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
        console.log("is in loading --- true")
        console.log(isAuth);
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