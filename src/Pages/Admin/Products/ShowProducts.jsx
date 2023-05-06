import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ReactNotifications } from 'react-notifications-component';
import Notification from '../../../Components/utils/Notifications/Notifications';
import Loader from '../../../Components/utils/Loader/Loader';
import ReactStars from "react-rating-stars-component";


const ShowProducts = () => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState("");

    const getProducts = async () => {
        const { data } = await axios.get(`${process.env.host}/api/v1/products`);
        setProducts(data);
    }

    useEffect(() => {
        getProducts();
    }, [])

    const searchProducts = () => {
        const filteredProducts = products.filter((product) => {
            return product.name.toLowerCase().includes(keyword.toLowerCase()) ||
                product.description.toLowerCase().includes(keyword.toLowerCase());
        });
        setProducts(filteredProducts);
    }

    const deleteProduct = async (id) => {
        try {
            setLoading(true)
            console.log(id);
            await axios.delete(`${process.env.host}/api/v1/product/${id}`)
            await getProducts()
            setLoading(false);
            setTimeout(() => {
                Notification('Success', 'Product Deleted Successfully', 'success')
            }, 100);
        } catch (error) {
            setLoading(false)
            setTimeout(() => {
                Notification('Error', error?.response?.data?.message, 'danger');
            }, 100);
        }

    }
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        const { data } = await axios.get(`${process.env.host}/api/v1/categories`);
        setCategories(data);
    }

    const [category, setCategory] = useState("");


    const searchByCat = async () => {
        if (category) {
            const filteredProducts = products.filter((product) => {
                return product.category.toLowerCase() === category.toLowerCase();
            });
            setProducts(filteredProducts);
        } else {
            await getProducts();
        }
    }
    return (
        <div>
            <ReactNotifications />
            <center>
                <Link to="/admin/addproduct">
                    <button className='btn btn-primary mt-5'>Add New Product</button>
                </Link>
            </center>
            <div className='d-flex p-4'>
                <input type="text" placeholder='Search Your Products' onChange={(e) => setKeyword(e.target.value)} value={keyword} className='searchPro' />
                <button className='btn btn-primary ms-4' onClick={searchProducts}>Search</button>
            </div>
            <div className='d-flex p-4'>
                <select className='signupInput' name='category' onChange={(e) => { setCategory(e.target.value); getProducts(); }} value={category}>
                    <option value="" selected>Search By Category</option>
                    {categories?.map((i) => { return (<option value={i?._id}>{i?.name}</option>) })}
                </select>
                <button className='btn btn-primary ms-4' onClick={searchByCat}>Search</button>
            </div>
            <div className="container-fluid">
                <header className='header w-100 mb-5'>
                    <h1 className="text-center text-black ">Products</h1>
                </header>
                {loading ? <Loader /> :
                    <div className="row">
                        {products?.map((i, key) => {
                            return (
                                <div key={key} className="col-12 col-md-4 col-lg-3 mb-4">
                                    <div className="card h-100">
                                        <Link to={`/admin/editproduct/${i?._id}`}>
                                            <img height={'200px'} src={i?.images[0]?.url} className="card-img-top" alt="Product " />
                                        </Link>
                                        <div className="card-body">
                                            <h5 className="card-title">{i?.name}</h5>
                                            <ReactStars isHalf={true} edit={false} size={20} count={5} value={i?.ratings}></ReactStars>
                                            <p className="card-text">{i?.description}</p>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between align-items-center">
                                            <button className="btn btn-danger me-2" onClick={() => deleteProduct(i?._id)}>Delete</button>
                                            <Link to={`/admin/editproduct/${i?._id}`}>
                                                <button className="btn btn-primary">Edit</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>)
                        })}
                    </div>}
            </div>
        </div>
    )
}

export default ShowProducts