import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../../../context/Product/ProductContext'
import UserContext from '../../../context/User/UserContext';
import Loader from '../../../Components/utils/Loader/Loader'


import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from '../../../Components/utils/Notifications/Notifications';
import { ReactNotifications } from 'react-notifications-component';

const PlaceOrder = () => {
    const { cart, cartTotal } = useContext(ProductContext);
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const Navigate = useNavigate();
    useEffect(() => {
        if (cart?.products?.length <= 0 || cart?.products?.length === undefined) {
            Navigate('/cart');
        }
    }, [cart.products])

    const place = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.host}/api/v1/placeorder`, { total: cartTotal });
            Notification('Success', 'Successfully Placed Your Order', 'success');
            setTimeout(() => {
                Navigate('/cart');
            }, 2000);
        } catch (error) {
            Notification('Error', error?.response?.data?.message, 'danger');
            Navigate('/cart');
        }
    }


    return (<>
        {loading ? <Loader /> : <div>
            <ReactNotifications />
            <div className="header text-black">
                <h1 className="text-center">Checkout</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">

                        <form>
                            <br /><h2 className='text-center'>Order Summary</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart && cart?.products?.map((item, key) => {
                                        return (<tr key={key}>
                                            <td>
                                                <img src={item?.product?.images[0].url} width="60px" alt="Product 1" />
                                            </td>
                                            <td>${item?.product?.price}</td>
                                            <td>{item?.quantity}</td>
                                            <td>${item?.product?.price * item?.quantity}</td>
                                        </tr>
                                        )
                                    })
                                    }
                                    <tr>
                                        <td colspan="3">Shipping</td>
                                        <td>$10.00</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3">Tax</td>
                                        <td>${(parseFloat(cartTotal * 0.1)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3">Total</td>
                                        <td>${(parseFloat((cartTotal + 10) + (cartTotal * 0.1))).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br /><h2 className='text-center'>Customer Information</h2>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" disabled className="form-control" id="inputFirstName" placeholder="Enter first name" value={user?.loggedInUser?.name} />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" disabled className="form-control" id="inputLastName" placeholder="Enter your Address" value={user?.loggedInUser?.address} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group ">
                                    <label>Email</label>
                                    <input type="email" disabled className="form-control" id="inputEmail" placeholder="Enter email address" value={user?.loggedInUser?.email} />
                                </div>
                                <div className="form-group ">
                                    <label>Phone</label>
                                    <input type="tel" disabled className="form-control" id="inputPhone" placeholder="Enter phone number" value={user?.loggedInUser?.phone} />
                                </div>
                            </div>
                            <br /><button onClick={place} type="submit" className="btn btn-primary btn-block">Place Order</button>

                        </form>

                    </div>

                </div>
            </div>
        </div>}
    </>
    )
}

export default PlaceOrder