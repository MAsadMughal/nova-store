import React, { useContext, useState } from 'react'
import "./Product.css";
import { Link, useNavigate } from "react-router-dom"
import ReactStars from 'react-rating-stars-component';
import CategoryIcon from '@mui/icons-material/Category'
import UserContext from '../../../context/User/UserContext';
const Product = ({ product, cartAddition }) => {
    const { user } = useContext(UserContext);
    const [selectedColor, setSelectedColor] = useState(product?.colors[0]?._id);
    const Navigate = useNavigate();
    return (
        <>
            <div className="col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-sm-6 col-12 p-2">
                <div className="card">
                    <Link to={`/product/${product._id}`}>
                        <img height='250vh' width="100%" className='card-img-top' style={{ objectFit: 'cover', padding: "5px" }} src={product?.images[0]?.url} alt="Product " />
                    </Link>
                    <div className="card-body">
                        <div style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', background: 'black', color: 'white', marginBottom: "20px", cursor: 'pointer', height: '25px', textAlign: 'center', width: '100px', borderRadius: '5px' }}><b>{product?.proFor}</b></div>
                        <h5 className="card-title">{product?.name}</h5>
                        <div className='Selected' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', }}>
                            {product?.colors?.map((i, ind) => {
                                return (
                                    <div key={ind} onClick={(e) => setSelectedColor(i._id)} style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', marginLeft: ind !== 0 && '5px', cursor: 'pointer', height: selectedColor === i._id ? '25px' : '20px', width: selectedColor === i._id?'50px':'40px', borderRadius: '5px', background: i?.name, }} value={i?._id}></div>)
                            })}</div>
                        <p className="card-text" style={{ marginTop: '10px' }}><CategoryIcon /> {product?.category?.name}</p>
                        <ReactStars isHalf={true} edit={false} size={20} count={5} value={product?.ratings}></ReactStars>
                        <p className="card-price">${product?.price}</p>
                        <button className="btn btn-primary" onClick={() => (user?.success && user?.loggedInUser?.isAdmin === false) ? cartAddition(product?._id, 1, selectedColor) : Navigate('/login')}>Add to Cart</button>
                    </div>
                </div>
            </div >
        </>

    )
}

export default Product