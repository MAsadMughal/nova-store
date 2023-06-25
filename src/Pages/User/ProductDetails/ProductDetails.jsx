import { motion } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactStars from "react-rating-stars-component";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link, useNavigate, useParams, } from "react-router-dom";
import "./ProductDetails.css";
import Reviews from './Reviews';
import axios from 'axios'
import ProductContext from "../../../context/Product/ProductContext";
import { ReactNotifications } from "react-notifications-component";
import Notification from "../../../Components/utils/Notifications/Notifications";
import Loader from "../../../Components/utils/Loader/Loader";
import UserContext from "../../../context/User/UserContext";
import { Typography } from "@mui/material";

const ProductDetails = () => {
    const scrollRef = useRef()
    const upscrollRef = useRef()
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const { addToCart } = useContext(ProductContext);
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false)
    const [selectedColor, setSelectedColor] = useState('');

    let [qty, setQty] = useState(1)
    const unit = product?.price;
    let [price, setprice] = useState(product?.price);
    let [ShowReviews, setShowReviews] = useState(false);
    useEffect(() => {
        setprice(unit * qty);
    }, [unit, qty])
    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        setLoading(true)
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/product/${id}`)

        setProduct(data);
        setSelectedColor(data?.colors[0]?._id)
        setLoading(false)
    }
    const Navigate = useNavigate()
    const cartAddition = async () => {
        if (user?.success && user?.loggedInUser?.isAdmin === false) {
            setLoading(true)
            await addToCart(id, qty, selectedColor);
            setLoading(false)
            Notification('Success', 'Product Added to Cart Successfully', 'success');
        } else {
            Navigate('/login')
        }
    }

    const showReviewsFun = () => {
        if (!ShowReviews) {
            setShowReviews(true);
            setTimeout(() => {
                scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
            }, 100);
        } else if (ShowReviews) {
            upscrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
            setTimeout(() => {
                setShowReviews(false);
            }, 500);
        }
    }
    return (
        <><ReactNotifications />
            <div ref={upscrollRef}></div>

            {loading ? <Loader /> :
                <>
                    <div className="d-flex flex-sm-row flex-column prodetails justify-content-evenly ms-3 me-3 mt-5">
                        {/* Carousel */}
                        <div id="carouselExampleIndicators" className={`carousel slide me-0 me-sm-4 w-100 w-sm-50 `} data-bs-interval="1000" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                {product?.images?.map((i, ind) => {
                                    return (<div className={`carousel-item ${ind === 0 && 'active'}`}>
                                        <img src={i?.url} className="d-block w-100" alt="..." />
                                    </div>)
                                })}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>


                        {/* //Description */}
                        <div className="w-100 w-sm-50 d-flex flex-column sec2prodetails justify-content-between align-items-start">
                            <Typography id=''>{product?.category?.name}</Typography>
                            <Typography style={{ fontSize: '30px' }}>{product?.name}</Typography>
                            {/* <p id="DescPara">{product?.description?.length >= 50 ? product?.description?.substring(0, 50) + '...' : product?.description}</p> */}
                            <p id="DescPara">ASDFASDFSDFA DF ASFASDF FASDFASDFJK FFJSDL FASDL FJASDLFASDJK;FL QDJF;LAS FJLASDJFAS;KLDFJADS</p>

                            <div className="d-flex flex-row align-items-center mt-1 ms-sm-3 mb-1 mb-sm-3" style={{ width: '' }}>
                                <button className="btn btn-info btn-sm text-light h6" disabled={(qty === 1) ? true : false} id="minus" onClick={() => setQty(qty - 1)}>-</button>
                                <Typography variant="h5" className='ms-3 me-3'>{qty}</Typography>
                                <button className="btn btn-info btn-sm text-light h6 me-3" disabled={(qty === 5) ? true : false} id="plus" onClick={() => setQty(qty + 1)}>+</button>
                                <Typography variant='h5'>Rs.&nbsp;{price}</Typography>
                            </div>
                            {(product?.ratings !== 0 && product?.ratings) && <ReactStars isHalf={true} edit={false} size={30} count={5} value={product?.ratings}></ReactStars>}
                            <div className='d-flex mb-4' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                                {product?.colors?.map((i, ind) => {
                                    return (
                                        <div key={ind} onClick={() => setSelectedColor(i?._id)} style={{ transition: 'all 0.1s ease-in-out',boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', marginTop: '10px', marginLeft: ind !== 0 && '20px', cursor: 'pointer', height: '20px', width: '20px', padding: selectedColor === i._id ? '0px' : '20px', borderRadius: '50%', background: i?.name, }} value={i?._id}></div>)
                                })}</div>
                            <Typography variant='h5'>{product?.stock >= 1 ? `` : `Out of Stock`}</Typography>
                            <button className="btn btn-info mt-0 mt-md-2 text-light" disabled={product?.stock <= 0} onClick={cartAddition} >Add to Cart</button>
                            <div>
                                <Link style={{ marginLeft: '0px' }} to={user?.success && user?.loggedInUser?.isAdmin === false ? `/writereview/${product?._id}` : '/login'} >
                                    <button className="btn btn-primary ms-0 me-3 mt-2 mt-md-5 ">Submit Review</button>
                                </Link>
                                <button className="btn btn-secondary me-3 mt-2 mt-md-5" onClick={showReviewsFun}>{ShowReviews ? `Hide Reviews` : `Show Reviews`}</button>
                            </div>
                        </div>
                    </div>



                    {/* Reviews */}
                    <motion.div initial="hidden"
                        whileInView="visible" viewport={{ once: true }} whileHover={{ transition: { duration: 0.2, ease: "easeInOut" } }
                        }>
                        <div ref={scrollRef}></div>
                        {ShowReviews ? <Reviews product={product} /> : null}
                    </motion.div>


                </>}
        </>
    )
}


export default ProductDetails
