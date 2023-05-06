import React from 'react'
import "./Product.css";
import { Link } from "react-router-dom"
import ReactStars from 'react-rating-stars-component';

const Product = ({ product, cartAddition }) => {
    return (
        <>
            <div className="col-sm-6 col-md-4 col-lg-3 p-3">
                <div className="card">
                    <Link to={`/product/${product._id}`}>
                        <img height={'200px'} src={product?.images[0]?.url} className="card-img-top" alt="Product " />
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title">{product?.name}</h5>
                        <p className="card-text">{product?.description}</p>
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