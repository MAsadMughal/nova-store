import React, { useContext, useEffect, useState } from 'react'
import "./Cart.css";
import CrossIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from 'react-router-dom';
import ProductContext from '../../../context/Product/ProductContext';
import CartComponent from './CartComponent';
import { ShoppingCart } from '@mui/icons-material';
import Loader from '../../../Components/utils/Loader/Loader';
import axios from 'axios';


const Cart = () => {
    const { cart, getCart, cartTotal, loading } = useContext(ProductContext);
    const [parentDisable, setParentDisabled] = useState(false);
    const [arr, setArr] = useState([]);

    useEffect(() => {
        getCart();
        getColors();
    }, [])

    useEffect(() => {
        const result = cart?.products?.map((item) => ({ _id: item?.product?._id, status: true }));
        if (result !== undefined && arr?.length <= 0 || (result !== undefined && result?.length !== arr?.length)) {
            setArr(result);
        }
    }, [cart])

    const change = (_id, val) => {
        const ind = arr?.findIndex((i) => i._id === _id && i?.status === val);
        if (ind >= 0) {
            const updatedArr = [...arr];
            updatedArr[ind].status = !val;
            setArr(updatedArr);
        }
    }

    useEffect(() => {
        if (arr?.length >= 1) {
            let boolstatus = false;
            arr.forEach((i) => {
                if (i.status === false) {
                    boolstatus = true
                }
            })
            if (boolstatus) {
                setParentDisabled(true);
            } else { setParentDisabled(false) }
        }
    }, [change])
    console.log(arr)



    const [colors, setColors] = useState([]);
    const getColors = async () => {
        const c = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/colors`);
        setColors(c?.data);
    }
    return (
        <div>
            <div className='header'>
                <h1 style={{ color: 'black' }}>Shopping Cart</h1>
            </div>
            {loading ? <Loader /> :
                <main>
                    {(cart?.products?.length <= 0 || !cart?.products) ?
                        <center>
                            <br /><br /><br /><br /><br /><br /><br />
                            <h1><ShoppingCart /> Your Cart is Empty</h1>
                            <Link to='/'><button className='btn btn-info'>Back to Home Page</button></Link>
                        </center>
                        :
                        <div className="container-fluid">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Qty</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Color</th>
                                        <th scope="col">Total</th>
                                        {window.innerWidth >= 400 ? <>
                                            <th scope="col">{window.innerWidth >= 600 ? 'Edit' : <EditIcon />}</th>
                                            <th scope="col">{window.innerWidth >= 600 ? 'Remove' : <CrossIcon />}</th>
                                        </>
                                            : <th scope="col"> <EditIcon /></th>
                                        }</tr>
                                </thead>
                                <tbody>
                                    {cart && cart?.products?.map((item, key) => {
                                        return (<CartComponent arr={arr} setParentDisabled={setParentDisabled} setArr={setArr} change={change} colors={colors} key={key} product={item} />)
                                    })
                                    }
                                </tbody>
                            </table>



                            {!parentDisable ? <div className="total d-flex justify-content-between align-items-center">
                                <h2>Total:</h2>
                                <p className="$total">${cartTotal}</p>
                            </div> : <h2>Selecting Products...</h2>
                            }
                            <div className="text-end">
                                <Link to="/checkout"><button disabled={parentDisable} className="btn btn-primary checkout-btn">Checkout</button>
                                </Link>
                            </div>
                            <br />
                        </div>
                    }
                </main>
            }

        </div>
    )
}

export default Cart