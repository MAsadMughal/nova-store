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
    const [allProducts, setAllProducts] = useState([]);

    const getProducts = async () => {
        setLoading(true)
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products`);
        setAllProducts(data);
        setProducts(data);
        setLoading(false)
    }

    useEffect(() => {
        getProducts();
    }, [])

    const searchProducts = (e) => {
        const key = e.target.value;
        const filteredProducts = allProducts.filter((product) => {
            return product.name.toLowerCase().includes(key.toLowerCase()) ||
                product.description.toLowerCase().includes(key.toLowerCase());
        });
        setProducts(filteredProducts);
    }

    const deleteProduct = async (id) => {
        try {
            setLoading(true)
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/product/${id}`)
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
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categories`);
        setCategories(data);
    }



    const searchByCat = async (e) => {
        const cat = e.target.value;
        if (cat) {
            const filteredProducts = allProducts.filter((product) => {
                return product.category._id.toLowerCase() === cat.toLowerCase();
            });
            setProducts(filteredProducts);
        } else {
            setProducts(allProducts)
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
                <input type="text" placeholder='Search Your Products' onChange={searchProducts} className='signupInput' />
            </div>
            <div className='d-flex p-4'>
                <select className='signupInput' name='category' onChange={searchByCat} defaultValue="">
                    <option value="" >Search By Category</option>
                    {categories?.map((i,k) => { return (<option key={k} value={i?._id}>{i?.name}</option>) })}
                </select>
            </div>
            <div className="container-fluid">

                {loading ? <Loader /> :
                    <div className="d-flex flex-wrap align-items-center justify-content-evenly">
                        {products?.map((i, key) => {
                            return (
                                <div key={key} className="col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-sm-6 col-12 p-2">
                                    <div className="card h-100">
                                        <Link to={`/admin/editproduct/${i?._id}`}>
                                            <img height='250vh' width="100%" className='card-img-top' style={{ objectFit: 'cover', padding: "5px" }} src={i?.images[0]?.url} alt="Product " />
                                        </Link>
                                        <div className="card-body">
                                            <h5 className="card-title">{i?.name}</h5>
                                            <ReactStars isHalf={true} edit={false} size={20} count={5} value={i?.ratings}></ReactStars>
                                            <p className="card-text">{i?.category?.name}</p>
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
        </div >
    )
}

export default ShowProducts