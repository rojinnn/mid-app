import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/UserContext";


const SettingsPage =() => {

    const { updateUserName,logoutUser, data: { userName },data } = useAuth();
    const [username, setUsername] = useState(userName);
    const navigate= useNavigate();

    const handleUpdateProfile = e => {
        updateUserName(username);
    };
    const handleLogout = e => {
        logoutUser();
        navigate("/");

    };
    console.log(data);
    return (<div className="">

        <input value={username} onChange={e => setUsername(e.target.value)} />   
        <button onClick={handleUpdateProfile}><span>Update Profile</span></button>
        <button onClick={handleLogout}><span>Logout</span></button>
   
    </div>)
};

export default SettingsPage;