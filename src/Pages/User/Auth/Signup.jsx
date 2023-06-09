import React, { useContext, useState } from 'react'
import "./Login.scss"
import axios from 'axios';
import { ReactNotifications } from 'react-notifications-component'
import Notification from '../../../Components/utils/Notifications/Notifications'
import UserContext from '../../../context/User/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../../Components/utils/Loader/Loader';



const Signup = ({ getUser }) => {
    let [loading, setLoading] = useState(false)
    let [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        repassword: "",
        phone: "",
        address: ""
    })
    const Navigate = useNavigate();
    const { getUserDetails } = useContext(UserContext);
    const { name, email, password, repassword, phone, address } = user;

    const signup = async (e) => {
        e.preventDefault();
        try {
            if (repassword === password) {
                setLoading(true)
                await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/signup`, { name, email, password, phone, address }, { withCredentials: true });
                setUser({
                    name: "",
                    email: "",
                    password: "",
                    repassword: "",
                    phone: "",
                    address: ""
                })
                await getUserDetails();
                await getUser();
                setLoading(false)
                Notification('Success', 'Signed Up Successfully.', 'success');
                setTimeout(() => {
                    Navigate('/');
                }, 1000);
            } else {
                setLoading(false)
                Notification('Error', 'Passwords do not match', 'danger');
            }
        } catch (error) {
            setLoading(false)
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
            {loading ? <Loader /> :
                <form id='Signupform'>
                    <h3>Create Account</h3>
                    <label>Name</label>
                    <input className='signupInput' type="text" name="name" value={name} onChange={handleChange} placeholder="Full Name" required />
                    <label>Email</label>
                    <input className='signupInput' type="text" name="email" value={email} onChange={handleChange} placeholder="Email" required />
                    <label>Phone No.</label>
                    <input className='signupInput' type="tel" name="phone" value={phone} onChange={handleChange} placeholder="Phone Number" required />
                    <label>Address</label>
                    <input className='signupInput' type="text" name="address" value={address} onChange={handleChange} placeholder="Complete Address" required />
                    <label>Password</label>
                    <input className='signupInput' type="password" name="password" value={password} onChange={handleChange} placeholder="Password" required />
                    <label>Confirm Password</label>
                    <input className='signupInput' type="password" name="repassword" value={repassword} onChange={handleChange} placeholder="Repeat Password" required />
                    <button className='loginSubmit' type="submit" onClick={signup}>Sign up</button>
                    <label className=''> Already have an account? <Link to='/login'>Login</Link> Now.</label>

                </form>}
        </div>
    )
}

export default Signup