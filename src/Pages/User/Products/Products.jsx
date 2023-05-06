import React, { useContext, useEffect, useState } from 'react'
import Product from './Product'
import axios from 'axios'
import { ReactNotifications } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../../../context/Product/ProductContext';
import Notification from '../../../Components/utils/Notifications/Notifications';

const Products = () => {
    const { addToCart } = useContext(ProductContext);
    const Navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        const { data } = await axios.get(`${process.env.host}/api/v1/categories`);
        setCategories(data);
    }

    const getProducts = async () => {
        const { data } = await axios.get(`${process.env.host}/api/v1/products`);
        setProducts(data);
    }

    useEffect(() => {
        getProducts();
    }, [])

    const searchProducts = () => {
        if (keyword) {
            const filteredProducts = products.filter((product) => {
                return product.name.toLowerCase().includes(keyword.toLowerCase()) ||
                    product.description.toLowerCase().includes(keyword.toLowerCase());
            });
            setProducts(filteredProducts);
        }
        else {
            getProducts();
        }
    }

    const cartAddition = async (id) => {
        await addToCart(id, 1);
        Notification('Success', 'Product Added to Cart Successfully', 'success');
        setTimeout(() => {
            Navigate('/cart')
        }, 2000);
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
        <>
            <ReactNotifications />
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
            <div className='d-flex flex-wrap'>
                {products && products?.map((item, ind) => {
                    return (item?.stock >= 1 && <Product cartAddition={cartAddition} key={ind} product={item} />)
                })}
            </div>
        </>
    )
}

export default Products