import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Notification from '../../../Components/utils/Notifications/Notifications'
import { ReactNotifications } from 'react-notifications-component'
import Loader from '../../../Components/utils/Loader/Loader'

const EditBrand = () => {
    const { id } = useParams()
    let [loading, setLoading] = useState(false)
    let [brand, setBrand] = useState({
        name: "",
        description: "",
    })

    useEffect(() => {
        getBrand();
    }, [])

    const getBrand = async () => {
        setLoading(true);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/brand/${id}`);
        setBrand(data);
        setLoading(false);

    }

    const { name, description } = brand;

    const handleChange = (e) => {
        setBrand((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const Navigate = useNavigate();

    const editBrand = async (e) => {
        e.preventDefault()
        try {
            if (name && description) {
                setLoading(true)
                await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/brand/${id}`, { name, description });
                setLoading(false)
                Notification('Success', 'Brand Updated Successfully', 'success')
                setBrand({
                    name: "",
                    description: "",
                })
                setTimeout(() => {
                    Navigate('/admin/brands')
                }, 2000);
            } else {
                Notification('Error', 'Enter Complete Information', 'danger')
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
                <h1 className="text-center text-black">Edit Brand</h1>
            </div>
            {loading ? <Loader /> :
                <div className="container">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Brand Name</label>
                            <input type="text" className="form-control" onChange={handleChange} value={name} name="name" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Brand Description</label>
                            <textarea className="form-control" onChange={handleChange} value={description} name="description" rows="3" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={editBrand}>Update Brand</button>
                        <Link to="/admin/brands">
                            <button type="submit" className="btn btn-primary ms-5">Go Back</button>
                        </Link>
                    </form>
                </div>}</div>
    )
}

export default EditBrand