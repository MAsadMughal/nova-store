import React, { useContext, useEffect } from 'react'
import "./Cart.css";
import CrossIcon from "@mui/icons-material/Close";
import { Link } from 'react-router-dom';
import ProductContext from '../../../context/Product/ProductContext';
import CartComponent from './CartComponent';
import { ShoppingCart } from '@mui/icons-material';


const Cart = () => {
    const { cart, getCart, cartTotal } = useContext(ProductContext);

    useEffect(() => {
        getCart();
    }, [])

    return (
        <div>
            <div className='header'>
                <h1 style={{ color: 'black' }}>Shopping Cart</h1>
            </div>
            <main>
                {cart?.products?.length <= 0 || !cart?.products ?
                    <center>
                        <br />                        <br /><br /><br /><br /><br /><br />
                        <h1><ShoppingCart /> Your Cart is Empty</h1>
                        <Link to='/'><button className='btn btn-info'>Back to Home Page</button></Link>
                    </center>
                    :
                    <div className="container-fluid">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className=''>Product</th>
                                    <th scope="col" className=''>Price</th>
                                    <th scope="col" >Qty</th>
                                    {window.innerWidth >= 600 ? <th scope="col">Total</th> : null}
                                    <th scope="col">{window.innerWidth >= 600 ? `Remove` : <CrossIcon />}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart && cart?.products?.map((item, key) => {
                                    return (<CartComponent key={key} product={item} />)
                                })
                                }
                            </tbody>
                        </table>



                        <div className="total d-flex justify-content-between align-items-center">
                            <h2>Total:</h2>
                            <p className="$total">${cartTotal}</p>
                        </div>
                        <div className="text-end">
                            <Link to="/checkout"><button className="btn btn-primary checkout-btn">Checkout</button>
                            </Link>
                        </div>
                        <br />
                    </div>}
            </main>

        </div>
    )
}

export default Cart