import React from 'react'
import "./Product.css";
import { Link } from "react-router-dom"
import ReactStars from 'react-rating-stars-component';
import CategoryIcon from '@mui/icons-material/Category'
const Product = ({ product, cartAddition }) => {
    return (
        <>
            <div className="col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-sm-6 col-12 p-2">
                <div className="card">
                    <Link to={`/product/${product._id}`}>
                        <img height='250vh' width="100%" className='card-img-top' style={{ objectFit: 'cover', padding: "5px" }} src={product?.images[0]?.url} alt="Product " />
                    </Link>
                    <div className="card-body">
                        <div style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',background:'black',color:'white', marginBottom: "20px", cursor: 'pointer', height: '25px', textAlign: 'center', width: '100px', borderRadius: '5px' }}><b>{product?.proFor}</b></div>
                        <h5 className="card-title">{product?.name}</h5>
                        <div className='Selected' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', }}>
                            {product?.colors?.map((i, ind) => {
                                return (
                                    <div key={ind} style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', marginLeft: ind !== 0 && '5px', cursor: 'pointer', height: '20px', width: '50px', borderRadius: '5px', background: i?.name, }} value={i?._id}></div>)
                            })}</div>
                        <p className="card-text" style={{ marginTop: '10px' }}><CategoryIcon /> {product?.category?.name}</p>
                        <ReactStars isHalf={true} edit={false} size={20} count={5} value={product?.ratings}></ReactStars>
                        <p className="card-price">${product?.price}</p>
                        <button className="btn btn-primary" onClick={() => cartAddition(product?._id)}>Add to Cart</button>
                    </div>
                </div>
            </div >
        </>

    )
}

export default Product