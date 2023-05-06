import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from '../../../Components/utils/Notifications/Notifications';
import { ReactNotifications } from 'react-notifications-component';

const ShowCategories = () => {
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState("")
    const searchCategories = () => {
        if (!keyword) {
            getCategories();
        } else {
            const filteredCategories = categories.filter((item) => {
                return item.name.toLowerCase().includes(keyword.toLowerCase()) ||
                    item.description.toLowerCase().includes(keyword.toLowerCase());
            });
            setCategories(filteredCategories);
        }
    }
    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categories`);
        console.log(data)
        setCategories(data);
    }

    const deleteCategory = async (id) => {
        try {
            console.log(id);
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/category/${id}`)
            await getCategories()
            Notification('Success', 'Category Deleted Successfully', 'success')
        } catch (error) {
            Notification('Error', error?.response?.data?.message, 'danger');
        }
    }
    return (
        <div>
            <ReactNotifications />
            <div className="container-fluid">
                <div className='header mb-5'>
                    <h1 className="text-center text-black">Categories</h1>
                </div>
                <center>
                    <Link to="/admin/addcategory">
                        <button className='btn btn-primary mt-5'>Add New Category</button>
                    </Link>
                </center>

                <div className='d-flex p-4'>
                    <input type="text" placeholder='Search Categories' onChange={(e) => setKeyword(e.target.value)} className='searchPro' />
                    <button className='btn btn-primary ms-4 ' onClick={searchCategories}>Search</button>
                </div>
                <div className="row">
                    {categories?.map((i, ind) => {
                        return (<div key={ind} className="col-md-4 mb-4">
                            <div className="card">
                                <img src="https://icon-library.com/images/icon-category/icon-category-0.jpg" className="card-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{i.name}</h5>
                                    <p className="card-text">{i.description}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <Link to={`/admin/editCategory/${i._id}`}>
                                                <button type="button" className="btn btn-sm btn-primary">Edit</button>
                                            </Link>
                                        </div>
                                        <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteCategory(i._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ShowCategories