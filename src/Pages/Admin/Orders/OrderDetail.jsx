import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "./OrderDetails.css";
import axios from 'axios';
import Loader from '../../../Components/utils/Loader/Loader';



const OrderDetail = () => {
    const [order, setOrder] = useState({});
    let [loading, setLoading] = useState(false)
    const { id } = useParams();
    useEffect(() => {
        getOrder()
    }, [])
    const getOrder = async () => {
        setLoading(true)
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/order/${id}`)
        setOrder(data);
        setLoading(false)
    }

    return (
        <div>
            <div className='header'>
                <h1 style={{ color: 'black' }}>Order Details</h1>
            </div>
            {loading ? <Loader /> :
                <main>
                    <div className="container py-5">
                        <div className="flex-wrap">
                            <div className="col">
                                <h2>Order #{order?._id}</h2>
                                <p>Date: {new Date(order?.createdAt).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}</p>
                            </div>

                            <h2>Order Items</h2>
                            <div className="d-flex flex-wrap p-2">
                                {order?.products?.map((item, ind) => {
                                    return (
                                        <div key={ind} className="col-md-4 p-4" >
                                            <div className="">
                                                <div className="card">
                                                    <Link to={`/product/${item.product?._id}`}>
                                                        <img style={{ maxHeight: '200px' }} src={item?.product?.images[0]?.url} alt="Product" className='img-fluid' />
                                                    </Link>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.product?.name}</h5>
                                                        <p className="card-text">{item.product?.price}Rs</p>
                                                        <p className="card-text">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="col">
                                <h2>Shipping Information</h2>
                                <p>Name: {order?.user?.name}</p>
                                <p>Address: {order?.user?.address}</p>
                                <p>Phone: {order?.user?.phone} </p>
                                <p>Zip Code: 22400</p>
                            </div>

                        </div>

                        <div className="mt-5">


                            <div className="col mt-5 mt-md-0">
                                <h2>Order Summary</h2>
                                <table className="table mt-4">
                                    <tbody>
                                        <tr>
                                            <td>Subtotal</td>
                                            <td>{order?.total} Rs.</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping</td>
                                            <td>10.00 Rs.</td>
                                        </tr>
                                        <tr>
                                            <td>Tax</td>
                                            <td>{(parseFloat(order?.total * 0.1)).toFixed(2)} Rs.</td>
                                        </tr>
                                        <tr>
                                            <td>Total</td>
                                            <td>{(parseFloat((order?.total + 10) + (order?.total * 0.1))).toFixed(2)} Rs.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <Link to="/admin/orders">
                                <button className='btn btn-primary'>Back to Orders</button>
                            </Link>
                        </div>
                    </div>
                </main>}
        </div>
    )
}

export default OrderDetail
