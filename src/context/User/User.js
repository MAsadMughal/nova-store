import React, { useState, useEffect } from 'react'
import axios from 'axios';
import UserContext from "./UserContext";



const User = (props) => {



    let [user, setUser] = useState({})

    useEffect(() => {
        getUserDetails();
    }, [])





    const getUserDetails = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/me`, { withCredentials: true });
            setUser(data);
        } catch (e) {
            // setError('');
        }
    }




    return (
        <UserContext.Provider value={{ user, getUserDetails }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default User