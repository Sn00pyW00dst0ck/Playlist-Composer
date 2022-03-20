import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

/* 
    Given an authentication state, will redirect to login page if not authenticated
*/
function ProtectedRoute({ auth }) {
    //If the user is not logged in we show the login with spotify route
    if (!auth)  {
        return <Navigate to={"/"} />
    }

    //Show the children
    return <Outlet />;
}

export default ProtectedRoute;