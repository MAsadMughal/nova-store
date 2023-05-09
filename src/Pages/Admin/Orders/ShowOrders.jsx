import React, { useEffect, useState } from 'react';
import OrderComponent from './OrderComponent';
import axios from 'axios';
import { ReactNotifications } from 'react-notifications-component';
import Notification from '../../../Components/utils/Notifications/Notifications';
import Loader from '../../../Components/utils/Loader/Loader';
function ShowOrders() {
    const [orders, setOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    let [loading, setLoading] = useState(false)

    useEffect(() => {
        getOrders();
    }, [])
    const getOrders = async () => {
        setLoading(true)
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/getallorders`);
        setAllOrders(data)
        setOrders(data)
        setLoading(false)
    }
    const changeStatus = async (id, status) => {
        try {
            setLoading(true)
            await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/order/${id}`, { status });
            await getOrders()
            setLoading(false)
            Notification('Success', 'Status Changed Successfully', 'success')
        } catch (error) {
            setLoading(false)
            Notification('Error', error?.response?.data?.message, 'danger');
        }
    }
    const deleteOrder = async (id) => {
        try {
            setLoading(true)
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/order/${id}`);
            await getOrders()
            setLoading(false)
            Notification('Success', 'Deletion Successful.', 'success')
        } catch (error) {
            setLoading(false)
            Notification('Error', error?.response?.data?.message, 'danger');
        }
    }

    const searchOrders = (e) => {
        const key = e.target.value;
        if (!key) {
            setOrders(allOrders);
        } else {
            const filteredorders = allOrders.filter((item) => {
                return item.user.name.toLowerCase().includes(key.toLowerCase())
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
                <input type="text" placeholder={window.innerWidth >= 500 ? `Search Orders by Customer Name` : `Customer Name`} onChange={searchOrders} className='signupInput' />
            </div>
            {loading ? <Loader /> : <>
                {orders?.map((order, ind) => (
                    <OrderComponent key={ind} deleteOrder={deleteOrder} changeStatus={changeStatus} item={order} />
                ))}
            </>
            }
        </div>
    );
}

export default ShowOrders;
