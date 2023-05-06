import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Orders.css";
import axios from 'axios'


const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getOrders();
    }, [])

    const getOrders = async () => {
        const { data } = await axios.get(`${process.env.host}/api/v1/getMyOrders`);
        setOrders(data)
    }
    return (
        <div>
            <div className='header'>
                <h1 style={{ color: 'black' }}>My Orders</h1>
            </div>
            <main>
                <div className="container mt-5">
                    <div className="row">
                        {/* <!-- Order Card --> */}
                        {orders?.map((item, ind) => {
                            return (
                                <div key={ind} className={window.innerWidth >= 600 ? `col` : `row`}>
                                    <div className="card">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img style={{ maxHeight: "200px" }} src={item?.products[0]?.product?.images[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"} alt="Product" className="img-fluid" />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">Order #{item._id}</h5>
                                                    <p className="card-text">Ordered At: {new Date(item.createdAt).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}</p>
                                                    <p className="card-text">Total: ${item?.total * 0.1 + item?.total + 10}</p>
                                                    <Link to={`/orderDetails/${item?._id}`}>
                                                        <button className="btn btn-primary">View Details</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>

            <footer className="bg-light py-3 position-absolute w-100">
                <div className="container text-center">
                    <p>&copy; 2023 Ecommerce Website. All rights reserved.</p>
                </div>
            </footer>
        </div >
    )
}

export default MyOrders