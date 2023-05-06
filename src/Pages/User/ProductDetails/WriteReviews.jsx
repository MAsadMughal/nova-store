import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Notification from '../../../Components/utils/Notifications/Notifications'
import { ReactNotifications } from 'react-notifications-component'
import ReactStars from "react-rating-stars-component"


const WriteReview = () => {
    let [review, setReview] = useState({
        comment: "",
        rating: 0,
    })


    const { comment, rating } = review;

    const handleChange = (e) => {
        setReview((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const Navigate = useNavigate();
    const { id } = useParams();
    const addReview = async (e) => {
        e.preventDefault()
        try {
            if (comment && rating) {
                await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/reviewProduct`, { rating, comment, productId: id });
                Notification('Success', 'Reviewed Successfully', 'success')
                setReview({
                    rating: 0,
                    comment: "",
                })
                setTimeout(() => {
                    Navigate(`/product/${id}`);
                }, 2000);
            } else {
                Notification('Error', 'Enter Complete Information', 'danger')
            }
        } catch (error) {
            Notification('Error', error?.response?.data?.message, 'danger')
        }
    }

    return (
        <div>
            <ReactNotifications />
            <div className="header">
                <h1 className="text-center text-black">Add a Review</h1>
            </div>
            <div className="container-fluid">
                <form>
                    <div className="mb-3">
                        <label className="form-label">Comment</label>
                        <input type="text" className="form-control" onChange={handleChange} value={comment} name="comment" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <div className='reactstar'>
                            <ReactStars value={rating} onChange={(e) => { setReview((prev) => ({ ...prev, rating: e })) }} color="lightgrey" activeColor="orange" size={window.innerWidth < 600 ? 20 : 25} isHalf={true} backgroundColor={"rgba(255, 255, 255, 0.5)"} />
                            <p className="title">{rating} STARS RATING</p>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={addReview}>Add Review</button>
                    <Link to={`/product/${id}`}>
                        <button type="submit" className="btn btn-primary ms-5">Go Back</button>
                    </Link>
                </form>
            </div></div>
    )
}

export default WriteReview