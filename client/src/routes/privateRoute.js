import React from "react";
import { Navigate } from "react-router-dom"; 


const PrivateRoute = ({children}) => {
    const userLogged = false;

    return userLogged ? children : <Navigate to="/" />
}

export default PrivateRoute;