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
            console.log(product?.colors)
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

            {loading ? <Loader /> :
                <div id="Reviews">
                    <div id='ProductDetailsMain'>
                        {/* Carousel */}

                        <div id='Carousel'>
                            <Carousel verticalSwipe='natural' showIndicator={false} autoFocus={true} transitionTime={1500} autoPlay={true} interval={3000} infiniteLoop={true} showArrows={false}>
                                {product && product.images?.map((item, key) => {
                                    return (
                                        <div key={key}>
                                            <img alt='ProductImage' src={item?.url} />
                                        </div>
                                    )
                                })}
                            </Carousel>
                        </div>
                        <div ref={upscrollRef}></div>
                        {/* //Description */}
                        <div id="ProductFunctions">
                            <h2 id='ProductTitle'>{product?.name}</h2>
                            <hr />
                            <div id="ReviewStars">
                                <h2 className='HomeHeading' id='HomeHeading'>&nbsp;&nbsp; Ratings: {product?.ratings}</h2>
                                {(product.ratings !== 0 && product?.ratings) && <ReactStars isHalf={true} edit={false} size={30} count={5} value={product?.ratings}></ReactStars>}
                                {product.ratings === 0 && <ReactStars isHalf={true} edit={false} size={30} count={5} value={0}></ReactStars>}
                            </div>

                            <hr />
                            <div className='Selected' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                                {product?.colors?.map((i, ind) => {
                                    return (
                                        <div key={ind} onClick={() => setSelectedColor(i._id)} style={{ marginTop: '10px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', marginLeft: ind !== 0 && '5px', cursor: 'pointer', height: selectedColor === i._id ? '50px' : '30px', width: selectedColor === i._id ? '50px' : '30px', borderRadius: '50%', background: i?.name, }} value={i?._id}></div>)
                                })}</div>
                            <div id="rowDirection">
                                <h2 className='HomeHeading' id='HomeHeading'>Rs. &nbsp;{price}</h2>
                                <button className="qtychange" disabled={(qty === 1) ? true : false} id="minus" onClick={() => setQty(qty - 1)}>-</button>
                                <h2 className='HomeHeading'>{qty}</h2>
                                <button className="qtychange" disabled={(qty === 5) ? true : false} id="plus" onClick={() => setQty(qty + 1)}>+</button>
                                <button id='CartButton' onClick={cartAddition} >Add to Cart</button>
                            </div>
                            <hr />
                            <div id="rowDirection">
                                <h2 className='HomeHeading' id='HomeHeading'>Status:</h2>
                                <h2>{product.stock >= 1 ? `In Stock` : `Out of Stock`}</h2>
                            </div>
                            <hr />
                            <div id="Description">
                                <h2 className='HomeHeading' id='HomeHeading'>Description :</h2>
                                <p id="DescPara">{product?.description}</p>
                            </div>
                            <div id="rowDirection">
                                <Link to={user?.success && user?.loggedInUser?.isAdmin === false ? `/writereview/${product?._id}` : '/login'} >
                                    <button id='CartButton'>Submit Review</button>
                                </Link>
                                <button id='CartButton' onClick={showReviewsFun}>{ShowReviews ? `Hide Reviews` : `Show Reviews`}</button>
                            </div>
                        </div>



                    </div>

                    {/* Reviews */}
                    <motion.div initial="hidden"
                        whileInView="visible" viewport={{ once: true }} whileHover={{ transition: { duration: 0.2, ease: "easeInOut" } }
                        }>
                        {ShowReviews ? <Reviews product={product} /> : null}
                        <div ref={scrollRef}></div>
                    </motion.div>

                </div>}
        </>
    )
}

export default ProductDetails
