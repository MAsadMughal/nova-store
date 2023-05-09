import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Notification from '../../../Components/utils/Notifications/Notifications'
import { ReactNotifications } from 'react-notifications-component'
import Loader from '../../../Components/utils/Loader/Loader'

const EditCategory = () => {
    const { id } = useParams()
    let [loading, setLoading] = useState(false)
    let [category, setCategory] = useState({
        name: "",
        description: "",
    })

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        setLoading(true);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/category/${id}`);
        setCategory(data);
        setLoading(false);

    }

    const { name, description } = category;

    const handleChange = (e) => {
        setCategory((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const Navigate = useNavigate();

    const editCategory = async (e) => {
        e.preventDefault()
        try {
            if (name && description) {
                setLoading(true)
                await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/category/${id}`, { name, description });
                setLoading(false)
                Notification('Success', 'Category Updated Successfully', 'success')
                setCategory({
                    name: "",
                    description: "",
                })
                setTimeout(() => {
                    Navigate('/admin/categories')
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
                <h1 className="text-center text-black">Edit Category</h1>
            </div>
            {loading ? <Loader /> :
                <div className="container">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Category Name</label>
                            <input type="text" className="form-control" onChange={handleChange} value={name} name="name" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Category Description</label>
                            <textarea className="form-control" onChange={handleChange} value={description} name="description" rows="3" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={editCategory}>Update Category</button>
                        <Link to="/admin/categories">
                            <button type="submit" className="btn btn-primary ms-5">Go Back</button>
                        </Link>
                    </form>
                </div>}</div>
    )
}

export default EditCategory