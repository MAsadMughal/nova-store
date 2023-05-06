import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link, useNavigate, useParams, } from "react-router-dom";
import { options } from "./objects";
import "./ProductDetails.css";
import Reviews from './Reviews';
import axios from 'axios'
import ProductContext from "../../../context/Product/ProductContext";
import { ReactNotifications } from "react-notifications-component";
import Notification from "../../../Components/utils/Notifications/Notifications";

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const { addToCart } = useContext(ProductContext);
    const Navigate = useNavigate()



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
        const { data } = await axios.get(`/api/v1/product/${id}`)
        setProduct(data);
    }
    const cartAddition = async () => {
        await addToCart(id, qty);
        Notification('Success', 'Product Added to Cart Successfully', 'success');
        setTimeout(() => {
            Navigate('/cart')
        }, 2000);
    }

    const showReviews = () => {
        setShowReviews(!ShowReviews);
    }
    return (
        <><ReactNotifications />
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
                            <Link to={`/writereview/${product?._id}`} >
                                <button id='CartButton'>Submit Review</button>
                            </Link>
                            <button id='CartButton' onClick={showReviews}>{ShowReviews ? `Hide Reviews` : `Show Reviews`}</button>
                        </div>
                    </div>



                </div>

                {/* Reviews */}
                <motion.div initial="hidden"
                    whileInView="visible" viewport={{ once: true }} whileHover={{ transition: { duration: 0.2, ease: "easeInOut" } }
                    }>
                    {ShowReviews ? <Reviews product={product} /> : null}
                </motion.div>

            </div>
        </>
    )
}

export default ProductDetails
