import React from 'react'
import SelectUsers from './Select-Users-Page';
import {Navigate, Outlet} from 'react-router-dom'

// CHANGE To API call to verify login
function useAuth() {
    return true;
}
// Calls useAuth function to verify login, redirects to spotify login otherwise
function ProtectedRoute () {
    const auth = useAuth();
    return auth ? <Outlet /> : window.location.replace('http://localhost:3001/login');
}

export default ProtectedRoute