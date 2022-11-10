import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UtilsContect } from '../elements/ContectsAPI'

export default function Logout() {
     
    const noti = useContext(UtilsContect);
    noti.addNewMessage('logout', 'warning');
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("myDetails");
    const navigate = useNavigate();
    navigate('/')
    return <>
        {sessionStorage.getItem("email")}
        Logout
    </>
}