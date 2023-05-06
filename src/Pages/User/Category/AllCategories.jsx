import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from '../../../Components/utils/Notifications/Notifications';
import { ReactNotifications } from 'react-notifications-component';

const AllCategories = () => {
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


                <div className="row">
                    {categories?.map((i) => {
                        return (<div className="col-md-4 mb-4">
                            <div className="card">
                                <img src="https://i.pinimg.com/originals/c7/67/c0/c767c01df6f9036a8e8ea256b41267bc.png" className="card-top" alt="..." />
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
                </div>
            </div>
        </div>
    )
}

export default AllCategories