import React, { useContext, useEffect, useState } from 'react'
import Product from './Product'
import axios from 'axios'
import { ReactNotifications } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../../../context/Product/ProductContext';
import Notification from '../../../Components/utils/Notifications/Notifications';
import Loader from '../../../Components/utils/Loader/Loader';

const Products = () => {
    const { addToCart } = useContext(ProductContext);
    const Navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        setLoading(true)
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categories`);
        setCategories(data);
        setLoading(false)
    }

    const getProducts = async () => {
        setLoading(true)
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products`);
        setAllProducts(data);
        setProducts(data);
        setLoading(false);
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



    const cartAddition = async (id) => {
        setLoading(true)
        await addToCart(id, 1);
        setLoading(false)
        Notification('Success', 'Product Added to Cart Successfully', 'success');
        setTimeout(() => {
            Navigate('/cart')
        }, 2000);
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
        <>
            <ReactNotifications />

            <div className='d-flex p-4'>
                <input type="text" placeholder='Search Your Products' onChange={searchProducts} className='signupInput' />
            </div>

            <div className='d-flex p-4'>
                <select className='signupInput' name='category' onChange={searchByCat} defaultValue="" >
                    <option value="" >Search By Category</option>
                    {categories?.map((i,k) => { return (<option key={k} value={i?._id}>{i?.name}</option>) })}
                </select>
            </div >
            {loading ? <Loader /> :
                <div className='d-flex flex-wrap align-items-center justify-content-evenly'>
                    {products && products?.map((item, ind) => {
                        return (item?.stock >= 1 && <Product cartAddition={cartAddition} key={ind} product={item} />)
                    })}
                </div>
            }
        </>
    )
}

export default Products