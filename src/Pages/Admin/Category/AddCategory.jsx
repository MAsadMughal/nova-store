import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from '../../../Components/utils/Notifications/Notifications'
import { ReactNotifications } from 'react-notifications-component'
import Loader from '../../../Components/utils/Loader/Loader'

const AddCategory = () => {
    let [category, setCategory] = useState({
        name: "",
        description: "",
    })
    let [loading, setLoading] = useState(false)

    const { name, description } = category;

    const handleChange = (e) => {
        setCategory((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const addCategory = async (e) => {
        e.preventDefault()
        try {
            if (name && description) {
                setLoading(true)
                await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/addcategory`, category, { withCredentials: true });
                setLoading(false)
                setCategory({
                    name: "",
                    description: "",
                })
                Notification('Success', 'Category Created Successfully', 'success')
                
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
                <h1 className="text-center text-black">Add Category</h1>
            </div>
            <div className="container-fluid">
                {loading ? <Loader /> : <form>
                    <div className="mb-3">
                        <label className="form-label">Category Name</label>
                        <input type="text" className="form-control" onChange={handleChange} value={name} name="name" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category Description</label>
                        <textarea className="form-control" onChange={handleChange} value={description} name="description" rows="3" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={addCategory}>Add Category</button>
                    <Link to="/admin/categories">
                        <button type="submit" className="btn btn-primary ms-5">Go Back</button>
                    </Link>
                </form>}
            </div></div>
    )
}

export default AddCategory