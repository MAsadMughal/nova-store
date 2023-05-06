import React, { useContext, useEffect, useState } from 'react'
import CrossIcon from "@mui/icons-material/Close";
import ProductContext from '../../../context/Product/ProductContext';
import axios from 'axios';

const CartComponent = ({ product }) => {
    const [qty, setqty] = useState(product?.quantity)
    const id = product.product._id;
    const { addToCart, getCart, cart } = useContext(ProductContext);
    const cartAddition = async (e) => {
        if (e.target.id === "plus") {
            setqty(qty + 1)
            await addToCart(id, qty + 1);
        } else if (e.target.id === "minus") {
            setqty(qty - 1)
            await addToCart(id, qty - 1);
        }
    }

    const remove = async () => {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/removefromcart`, { productId: product._id });
        await getCart();
    }

    return (
        <tr>
            <td>
                <div className="d-flex align-items-center">
                    <img src={product?.product?.images[0]?.url} alt="Product 1" className="cartimg img -thumbnail " />
                </div>
            </td>
            <td>{product?.product?.price}</td>
            <td>
                <div className="d-flex buttonswrappercart ">
                    <button className="btn btn-secondary minus-btn" id='minus' onClick={cartAddition}>-</button>
                    <input type="number" value={product?.quantity} disabled style={{ backgroundColor: 'white' }} className="form-control quantity-input" />
                    <button className="btn btn-secondary plus-btn" id='plus' onClick={cartAddition}>+</button>
                </div>
            </td>
            {window.innerWidth >= 600 ? <td>{product?.product?.price * product?.quantity}</td> : null}
            <td>
                <button onClick={remove} className="btn btn-sm btn-danger remove-btn">{window.innerWidth >= 600 ? `Remove` : <CrossIcon />}</button>
            </td>
        </tr>)
}

export default CartComponent