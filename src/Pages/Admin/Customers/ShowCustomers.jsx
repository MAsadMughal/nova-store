import React, { useContext, useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import Notification from '../../../Components/utils/Notifications/Notifications';
import { ReactNotifications } from 'react-notifications-component';
import UserContext from '../../../context/User/UserContext'

function ShowCustomers() {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        getCustomers();
    }, [])
    const { user } = useContext(UserContext);
    const getCustomers = async () => {
        const { data } = await axios.get(`${process.env.host}/api/v1/allusers`);
        setCustomers(data)
    }
    const deleteUser = async (id) => {
        try {
            console.log(id);
            await axios.delete(`${process.env.host}/api/v1/user/${id}`)
            await getCustomers()
            Notification('Success', 'Customer Deleted Successfully', 'success')
        } catch (error) {
            Notification('Error', error?.response?.data?.message, 'danger');
        }
    }

    const [keyword, setKeyword] = useState("")
    const searchcustomers = () => {
        if (!keyword) {
            getCustomers();
        } else {
            const filteredcustomers = customers.filter((item) => {
                return item.name.toLowerCase().includes(keyword.toLowerCase()) ||
                    item.email.toLowerCase().includes(keyword.toLowerCase()) ||
                    item.phone.toLowerCase().includes(keyword.toLowerCase())||
                    item.role.toLowerCase().includes(keyword.toLowerCase());
            });
            setCustomers(filteredcustomers);
        }
    }

    return (
        <div className="container-fluid">
            <ReactNotifications />
            <div className="header text-black" >
                <h1 className="text-center ">Customers</h1>
            </div>
            <div className='d-flex p-4'>
                <input type="text" placeholder='Search Customers' onChange={(e) => setKeyword(e.target.value)} className='searchPro' />
                <button className='btn btn-primary ms-4 ' onClick={searchcustomers}>Search</button>
            </div>
            <table className="table responsive striped bordered hover">
                <thead>
                    <tr >
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>{window.innerWidth >= 600 ? `Delete` : <DeleteIcon />}</th>
                    </tr>
                </thead>
                <tbody>
                    {customers?.map((i) => (
                        <tr style={{ fontSize: '0.8rem' }} key={i?.id}>
                            <td>{i?.name}</td>
                            <td>{i?.email}</td>
                            <td>{i?.phone}</td>
                            <td>{i?.isAdmin ? `Admin` : `User`}{i?._id === user?.loggedInUser?._id ? `(You)` : null}</td>
                            <td><button className='btn btn-sm btn-danger' onClick={() => { deleteUser(i?._id) }}>{window.innerWidth >= 600 ? `Delete` : <DeleteIcon fontSize="small" />}</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowCustomers;
