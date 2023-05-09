import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from '../../../Components/utils/Notifications/Notifications';
import { ReactNotifications } from 'react-notifications-component';
import Loader from '../../../Components/utils/Loader/Loader';

const AllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState("")
    let [loading, setLoading] = useState(false);
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
        setLoading(true)
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categories`);
        setCategories(data);
        setLoading(false)
    }

    return (
        <div>
            <div className="container-fluid">

                <div className='header mb-5'>
                    <h1 className="text-center text-black">Categories</h1>
                </div>
                <div className='d-flex p-4'>
                    <input type="text" placeholder='Search Categories' onChange={(e) => setKeyword(e.target.value)} className='searchPro' />
                    <button className='btn btn-primary ms-4 ' onClick={searchCategories}>Search</button>
                </div>

                {loading ? <Loader /> :
                    <div className="d-flex flex-wrap align-items-center justify-content-evenly">
                        {categories?.map((i,k) => {
                            return (<div key={k} className="col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-sm-6 col-12 p-2">
                                <div className="card">
                                    <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="card-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{i?.name}</h5>
                                        <p className="card-text">{i?.description}.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to={`/products`}>
                                                    <button type="button" className="btn btn-sm btn-primary">View Products</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                    </div>}
            </div>
        </div>
    )
}

export default AllCategories