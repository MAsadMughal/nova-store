import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from '../../../Components/utils/Notifications/Notifications'
import { ReactNotifications } from 'react-notifications-component'

const AddCategory = () => {
    let [category, setCategory] = useState({
        name: "",
        description: "",
    })


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
            // if (name && description) {
            console.log('mem')

            await axios.post(`${process.env.host}/api/v1/addcategory`, category, { withCredentials: true });
            Notification('Success', 'Category Created Successfully', 'success')
            setCategory({
                name: "",
                description: "",
            })
            // } else {
            //     Notification('Error', 'Enter Complete Information', 'danger')
            // }
        } catch (error) {
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
                <form>
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
                </form>
            </div></div>
    )
}

export default AddCategory