import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../../../context/Product/ProductContext'
import UserContext from '../../../context/User/UserContext';
import Loader from '../../../Components/utils/Loader/Loader'


import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from '../../../Components/utils/Notifications/Notifications';
import { ReactNotifications } from 'react-notifications-component';

const PlaceOrder = () => {
    const { cart, cartTotal, loading, setLoading } = useContext(ProductContext);
    const { user } = useContext(UserContext);

    const Navigate = useNavigate();
    useEffect(() => {
        if (cart?.products?.length <= 0 || cart?.products?.length === undefined) {
            Navigate('/cart');
        }
    }, [cart?.products])

    const place = async (e) => {
        e.preventDefault();
        try {
            // const data = cart.products.map((i) => {
            //     const { quantity } = i;
            //     const { name, _id, price, images } = i.product;
            //     return { quantity, name, _id, price, image: images[0].url };
            // })
            setLoading(true)
            // await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/placeorder`, { total: cartTotal });
            await axios
                .post(`${process.env.REACT_APP_API_URL}/api/v1/create-checkout-session`, {
                    cart,
                })
                .then((response) => {
                    if (response?.data?.url) {
                        window.location.href = response.data.url;
                    }
                })
                .catch((err) => console.log(err.message));

            setLoading(false)
            Notification('Success', 'Successfully Placed Your Order', 'success');
            // setTimeout(() => {
            //     Navigate('/cart');
            // }, 2000);
        } catch (error) {
            setLoading(false)
            Notification('Error', error?.response?.data?.message, 'danger');
            // Navigate('/cart');
        }
    }


    return (<>
        <ReactNotifications />
        {loading ? <Loader /> : <div>
            <div className="header text-black">
                <h1 className="text-center">Checkout</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="">
                        <form>
                            <br /><h2 className='text-center'>Order Summary</h2>
                            <table className="table w-100">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        {window.innerWidth >= 400 ? <th scope="col">Color</th> : null}
                                        <th scope="col">Price</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart && cart?.products?.map((item, key) => {
                                        return (<tr key={key}>
                                            {window.innerWidth >= 400 ? <>
                                                <td>
                                                    <img src={item?.product?.images[0].url} width="60px" alt="Product 1" />
                                                </td>
                                                <td><div style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', background: item?.color?.name, color: 'white', marginBottom: "20px", cursor: 'pointer', height: '25px', textAlign: 'center', width: '60px', marginTop: '10px', borderRadius: '5px' }}></div></td>
                                            </> : <td>
                                                <img src={item?.product?.images[0].url} width="60px" alt="Product 1" />
                                                <div style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', background: item?.color?.name, color: 'white', marginBottom: "20px", marginTop: '10px', cursor: 'pointer', height: '15px', textAlign: 'center', width: '60px', borderRadius: '5px' }}></div></td>
                                            }
                                            <td>{item?.product?.price} Rs.</td>
                                            <td>{item?.quantity}</td>
                                            <td>{item?.product?.price * item?.quantity} Rs.</td>
                                        </tr>
                                        )
                                    })
                                    }
                                    <tr>
                                        <td colSpan={window.innerWidth >= 400 ? '4' : '3'}>Shipping</td>
                                        <td>10.00 Rs.</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={window.innerWidth >= 400 ? '4' : '3'}>Tax</td>
                                        <td>{(parseFloat(cartTotal * 0.1)).toFixed(2)} Rs.</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={window.innerWidth >= 400 ? '4' : '3'}>Total</td>
                                        <td>{(parseFloat((cartTotal + 10) + (cartTotal * 0.1))).toFixed(2)} Rs.</td>
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
                        <br />

                    </div>

                </div>
            </div>
        </div >}
    </>
    )
}

export default PlaceOrder