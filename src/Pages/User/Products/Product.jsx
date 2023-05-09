import React from 'react'
import "./Product.css";
import { Link } from "react-router-dom"
import ReactStars from 'react-rating-stars-component';

const Product = ({ product, cartAddition }) => {
    return (
        <>
            <div className="col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-sm-6 col-12 p-2">
                <div className="card">
                    <Link to={`/product/${product._id}`}>
                        <img height='250vh' width="100%" className='card-img-top' style={{ objectFit: 'cover',padding:"5px" }} src={product?.images[0]?.url} alt="Product " />
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title">{product?.name}</h5>
                        <p className="card-text">{product?.category?.name}</p>
                        <ReactStars isHalf={true} edit={false} size={20} count={5} value={product?.ratings}></ReactStars>
                        <p className="card-price">${product?.price}</p>
                        <button className="btn btn-primary" onClick={() => cartAddition(product?._id)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Product