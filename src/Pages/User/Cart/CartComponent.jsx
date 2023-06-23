import React, { useContext, useState } from 'react'
import CrossIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SubmitIcon from "@mui/icons-material/Done";
import ProductContext from '../../../context/Product/ProductContext';
import axios from 'axios';

const CartComponent = ({ product, colors, change, }) => {
    const [qty, setqty] = useState(product?.quantity)
    const [currColor, setCurrColor] = useState(product?.color?._id)
    const id = product.product._id;
    const { addToCart, getCart, setLoading } = useContext(ProductContext);
    const cartAddition = async (e) => {
        if (e.target.id === "plus") {
            if (qty <= 4) {
                setqty(qty + 1)
            }
        } else if (e.target.id === "minus") {
            if (qty >= 2) {
                setqty(qty - 1)
            }
        }
    }
    const [disable, setDisable] = useState(true);


    const EditFun = async () => {
        try {
            setLoading(true)
            await addToCart(id, qty, currColor);
            setDisable(true)
            change(id, false)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setDisable(true)
            change(id, false)
            setLoading(false)
        }
    }

    const remove = async () => {
        setLoading(true)
        const id = product._id;

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/removefromcart`, { productId: product._id });
            await getCart();
            setLoading(false)
        } catch (error) {
            await getCart();
            setLoading(false)
        }
    }

    return (
        <tr>
            <td>
                <div className="d-flex buttonswrappercart ">
                    <button className="btn btn-secondary minus-btn" disabled={disable} id='minus' onClick={cartAddition}>-</button>
                    <input type="number" value={qty} disabled style={{ backgroundColor: 'white' }} className="form-control quantity-input" />
                    <button className="btn btn-secondary plus-btn" disabled={disable} id='plus' onClick={cartAddition}>+</button>
                </div>
            </td>
            <td>
                <div className="d-flex align-items-center">
                    <img src={product?.product?.images[0]?.url} alt="Product 1" className="cartimg img -thumbnail " />
                </div>
            </td>
            <td>
                <select name='color' disabled={disable} value={currColor} onChange={(e) => setCurrColor(e.target.value)} className={window.innerWidth >= 400 ? 'signupInput ps-1 pe-1 w-50 text-dark' : 'signupInput ps-0 pe-0 w-100 text-dark '} >
                    {
                        product?.product?.colors?.map((i, key) => {
                            const curr = colors?.find((col) => col._id === i);
                            return (
                                <option key={key} value={i}>{curr?.name}
                                </option>)
                        })
                    }
                </select>
            </td>
            <td>${product?.product?.price * qty}</td>
            {window.innerWidth >= 400 ? <> <td>
                <button onClick={disable ? () => { setDisable(false); change(id, true) } : EditFun} className="btn btn-sm btn-info text-light">{disable ? (window.innerWidth >= 600 ? `Edit` : <EditIcon />) : window.innerWidth >= 600 ? `Submit` : <SubmitIcon />}</button>
            </td>
                <td>
                    <button onClick={remove} className="btn btn-sm btn-danger remove-btn">{window.innerWidth >= 600 ? `Remove` : <CrossIcon />}</button>
                </td></>
                : <td>
                    <button onClick={disable ? () => { setDisable(false); change(id, true) } : EditFun} className="btn btn-sm btn-info text-light">{disable ? (window.innerWidth >= 600 ? `Edit` : <EditIcon />) : window.innerWidth >= 600 ? `Submit` : <SubmitIcon />}</button>
                    <button onClick={remove} className="btn btn-sm mt-2 btn-danger remove-btn">{window.innerWidth >= 600 ? `Remove` : <CrossIcon />}</button>
                </td>}

        </tr >)
}

export default CartComponent