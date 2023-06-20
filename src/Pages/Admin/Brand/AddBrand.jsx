import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from '../../../Components/utils/Notifications/Notifications'
import { ReactNotifications } from 'react-notifications-component'
import Loader from '../../../Components/utils/Loader/Loader'

const AddBrand = () => {
    let [brand, setBrand] = useState({
        name: "",
        description: "",
    })
    let [loading, setLoading] = useState(false)

    const { name, description } = brand;

    const handleChange = (e) => {
        setBrand((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const addBrand = async (e) => {
        e.preventDefault()
        try {
            if (name && description) {
                setLoading(true)
                await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/addBrand`, brand, { withCredentials: true });
                setLoading(false)
                setBrand({
                    name: "",
                    description: "",
                })
                Notification('Success', 'Brand Created Successfully', 'success')
                
            } else {
                Notification('Error', 'Enter Both Fields', 'danger')
            }
        } catch (error) {
            setLoading(false)
            Notification('Error', error?.response?.data?.message, 'danger')
        }
    }

    return (
        <div>
            <ReactNotifications />
            <div className="header">
                <h1 className="text-center text-black">Add Brand</h1>
            </div>
            <div className="container-fluid">
                {loading ? <Loader /> : <form>
                    <div className="mb-3">
                        <label className="form-label">Brand Name</label>
                        <input type="text" className="form-control" onChange={handleChange} value={name} name="name" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Brand Description</label>
                        <textarea className="form-control" onChange={handleChange} value={description} name="description" rows="3" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={addBrand}>Add Brand</button>
                    <Link to="/admin/brands">
                        <button type="submit" className="btn btn-primary ms-5">Go Back</button>
                    </Link>
                </form>}
            </div></div>
    )
}

export default AddBrand