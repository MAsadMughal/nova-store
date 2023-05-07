import React, { useEffect, useState } from 'react';
import OrderComponent from './OrderComponent';
import axios from 'axios';
import { ReactNotifications } from 'react-notifications-component';
import Notification from '../../../Components/utils/Notifications/Notifications';
function ShowOrders() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getOrders();
    }, [])
    const getOrders = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/getallorders`);
        setOrders(data)
    }
    const changeStatus = async (id, status) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/order/${id}`, { status });
            await getOrders()
            Notification('Success', 'Status Changed Successfully', 'success')
        } catch (error) {
            Notification('Error', error?.response?.data?.message, 'danger');
        }
    }
    const deleteOrder = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/order/${id}`);
            await getOrders()
            Notification('Success', 'Deletion Successful.', 'success')
        } catch (error) {
            Notification('Error', error?.response?.data?.message, 'danger');
        }
    }

    const [keyword, setKeyword] = useState("")
    const searchOrders = () => {
        if (!keyword) {
            getOrders();
        } else {
            const filteredorders = orders.filter((item) => {
                return item.user.name.toLowerCase().includes(keyword.toLowerCase())
            });
            setOrders(filteredorders);
        }
    }

    return (
        <div className="container">
            <ReactNotifications />
            <div className="header text-black" >
                <h1 className="text-center ">Orders</h1>
            </div>
            <div className='d-flex p-4'>
                <input type="text" placeholder={window.innerWidth >= 500 ? `Search Orders by Customer Name` : `Customer Name`} onChange={(e) => setKeyword(e.target.value)} className='searchPro' />
                <button className='btn btn-primary ms-4 ' onClick={searchOrders}>Search</button>
            </div>
            {orders?.map((order, ind) => (
                <OrderComponent key={ind} deleteOrder={deleteOrder} changeStatus={changeStatus} item={order} />
            ))}
        </div>
    );
}

export default ShowOrders;
