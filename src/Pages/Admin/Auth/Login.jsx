import React, { useContext, useState } from 'react'
import "./Login.scss";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../../context/User/UserContext';
import Notification from '../../../Components/utils/Notifications/Notifications';
import { ReactNotifications } from 'react-notifications-component';

const AdminLogin = ({ getUser }) => {
    const { getUserDetails } = useContext(UserContext);
    let [user, setUser] = useState({
        email: "",
        password: "",
    })

    const { email, password } = user;

    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const Navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.host}/api/v1/adminlogin`, { email, password }, { withCredentials: true });
            // Notification('Success', 'Logged In Successfully.', 'success');
            setUser({
                email: "",
                password: "",
            })
            await getUserDetails();
            await getUser();
            Navigate('/');
        }
        catch (error) {
            Notification('Error', error?.response?.data?.message, 'danger');
        }
    }

    return (
        <div id='loginBody'>
            <div className="background">
                <div className="shape"></div>
                <div className="shape" ></div>
            </div>
            <ReactNotifications />
            <form id='form'>
                <h3>ADMIN's LOGIN</h3>
                <label >Username</label>
                <input className='loginInput' type="text" name='email' value={email} onChange={handleChange} placeholder="Email" />
                <label >Password</label>
                <input className='loginInput' type='password' name='password' value={password} onChange={handleChange} placeholder="Password" />

                <button className='loginSubmit' onClick={login}>Log In</button>

            </form>

        </div>
    )
}
export default AdminLogin