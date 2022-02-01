import React, { useState } from "react";
import { useAuth } from "../context/UserContext";

const SettingsPage =() => {

    const { updateUserName, data: { userName } } = useAuth();
    const [username, setUsername] = useState(userName);

    const handleUpdateProfile = e => {
        updateUserName(username);
    };

    return (<div className="">

        <input value={username} onChange={e => setUsername(e.target.value)} />
        <button onClick={handleUpdateProfile}><span>Update Profile</span></button>
    </div>)
};

export default SettingsPage;