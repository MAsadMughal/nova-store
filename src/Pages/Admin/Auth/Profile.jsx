import React, { useContext, useState } from 'react'
import "./Login.scss"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserContext from '../../../context/User/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';
import Notification from '../../../Components/utils/Notifications/Notifications';

const AdminProfile = () => {
    const { user, getUserDetails } = useContext(UserContext);

    let [profile, setUser] = useState({
        name: user?.loggedInUser?.name,
        email: user?.loggedInUser?.email,
        password: "",
        oldPassword: "",
        phone: user?.loggedInUser?.phone,
        address: user?.loggedInUser?.address
    })
    const Navigate = useNavigate();
    const { name, email, oldPassword, password, phone, address } = profile;

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.host}/api/v1/updateProfile`, { name, email, oldPassword, password, phone, address }, { withCredentials: true });
            Notification('Success', 'Updated Successfully.', 'success');
            setUser({
                name: "",
                email: "",
                password: "",
                phone: "",
                address: ""
            })
            await getUserDetails();
            setTimeout(() => {
                Navigate('/');
            }, 2000);
        } catch (error) {
            console.log(error);
            Notification('Error', error?.response?.data?.message, 'danger');
        }
    }


    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }



    return (
        <div id='loginBody'>
            <div className="background">
                <div className="shape"></div>
                <div className="shape" ></div>
            </div>
            <ReactNotifications />
            <form id='Signupform'>
                <center >
                    <AccountCircleIcon fontSize='large' />
                </center>
                <h3>Admin Profile Details</h3>
                <label>Name</label>
                <input className='signupInput' type="text" name="name" value={name} onChange={handleChange} placeholder="Full Name" required />
                <label>Email</label>
                <input className='signupInput' type="text" name="email" value={email} onChange={handleChange} placeholder="Email" required />
                <label>Phone No.</label>
                <input className='signupInput' type="tel" name="phone" value={phone} onChange={handleChange} placeholder="Phone Number" required />
                <label>Address</label>
                <input className='signupInput' type="text" name="address" value={address} onChange={handleChange} placeholder="Complete Address" required />
                <label>Old Password</label>
                <input className='signupInput' type="password" name="oldPassword" value={oldPassword} onChange={handleChange} placeholder="Old Password" required />
                <label>New Password</label>
                <input className='signupInput' type="password" name="password" value={password} onChange={handleChange} placeholder="New Password" required />
                <button className='loginSubmit' type="submit" onClick={updateProfile}>UPDATE</button>
            </form>


        </div>
    )
}

export default AdminProfile