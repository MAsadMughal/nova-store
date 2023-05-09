import React, { useContext, useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import Notification from '../../../Components/utils/Notifications/Notifications';
import { ReactNotifications } from 'react-notifications-component';
import UserContext from '../../../context/User/UserContext'
import Loader from '../../../Components/utils/Loader/Loader';

function ShowCustomers() {
    const [customers, setCustomers] = useState([]);
    let [loading, setLoading] = useState(false)

    useEffect(() => {
        getCustomers();
    }, [])
    const { user } = useContext(UserContext);
    const getCustomers = async () => {
        setLoading(true)
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/allusers`);
        setCustomers(data)
        setLoading(false)
    }
    const deleteUser = async (id) => {
        try {
            setLoading(true)
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/user/${id}`)
            await getCustomers()
            setLoading(false);
            Notification('Success', 'Customer Deleted Successfully', 'success')
        } catch (error) {
            setLoading(false);
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
                    item.phone.toLowerCase().includes(keyword.toLowerCase()) ||
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
            {loading ? <Loader /> :
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
                        {customers?.map((i,ind) => (
                            <tr style={{ fontSize: '0.8rem' }} key={ind}>
                                <td>{i?.name}</td>
                                <td>{i?.email}</td>
                                <td>{i?.phone}</td>
                                <td>{i?.isAdmin ? `Admin` : `User`}{i?._id === user?.loggedInUser?._id ? `(You)` : null}</td>
                                <td><button className='btn btn-sm btn-danger' onClick={() => { deleteUser(i?._id) }}>{window.innerWidth >= 600 ? `Delete` : <DeleteIcon fontSize="small" />}</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
        </div>
    );
}

export default ShowCustomers;
