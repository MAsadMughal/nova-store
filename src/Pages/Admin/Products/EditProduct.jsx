import React, { useEffect, useState } from 'react'
import "./Login.scss"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { ReactNotifications } from 'react-notifications-component'
import Notification from '../../../Components/utils/Notifications/Notifications'
import Loader from '../../../Components/utils/Loader/Loader'



const EditProduct = () => {
    const Navigate = useNavigate()
    const [loading, setLoading] = useState(false);



    let [images, setImages] = useState({
        image1: "",
        image2: "",
        image3: ""
    })
    let [imagesUrl, setImagesUrl] = useState({
        image1: "",
        image2: "",
        image3: ""
    })
    const { image1, image2, image3 } = images;
    const { image1: photo1, image2: photo2, image3: photo3 } = imagesUrl;

    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        weight: '',
        p1: photo1, p2: photo2, p3: photo3,
        description: ''
    })

    const imageChange = (e) => {
        setImages((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.files[0]
        }))

    }
    //handle Image 
    useEffect(() => {
        if (image1) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setImagesUrl((prevValue) => ({ ...prevValue, image1: reader.result }));
                setProduct((prevValue) => ({ ...prevValue, p1: reader.result }));
            }
            reader.readAsDataURL(image1);
        }
        if (image2) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setImagesUrl((prevValue) => ({ ...prevValue, image2: reader.result }));
                setProduct((prevValue) => ({ ...prevValue, p2: reader.result }));
            }
            reader.readAsDataURL(image2);
        }
        if (image3) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setImagesUrl((prevValue) => ({ ...prevValue, image3: reader.result }));
                setProduct((prevValue) => ({ ...prevValue, p3: reader.result }));
            }
            reader.readAsDataURL(image3);
        }
    }, [image1, image2, image3])



    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories();
    }, [])
    const getCategories = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categories`)
        setCategories(data);
    }





    const { name, category, price, stock, weight, description, p1, p2, p3 } = product;

    const { id } = useParams()
    const getProductDetails = async () => {
        const { data } = await axios.get(`/api/v1/product/${id}`)
        setProduct(data);
    }
    useEffect(() => {
        getProductDetails();
    }, [])



    const handleChange = (e) => {
        setProduct((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }




    const unselectImages = (e) => {
        e.preventDefault();
        setImages({
            image1: "",
            image2: "",
            image3: ""
        })
        setImagesUrl({
            image1: "",
            image2: "",
            image3: ""
        })
    }
    //Editing Product
    const editProduct = async (e) => {
        e.preventDefault();

        if ((p1 && p2 && p3) || (!p1 && !p2 && !p3)) {
            try {
                setLoading(true)
                await axios.put(`/api/v1/product/${id}`, product);
                setProduct({
                    name: '',
                    category: '',
                    price: '',
                    stock: '',
                    weight: '',
                    p1: photo1, p2: photo2, p3: photo3,
                    description: ''
                })
                setLoading(false);
                Notification('Success', "Product Updated Successfully.", 'success');
                setTimeout(() => {
                    Navigate('/admin/products');
                }, 2000);
            } catch (error) {
                setLoading(false);
                Notification('Error', error?.response?.data?.message, 'danger');
            }
        } else {
            Notification('Error', "Insert All 3 Images or unselect all using button.", 'danger');
        }
    }

    return (
        <>
            <ReactNotifications />
            <div id='loginBody'>
                <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
                {loading ? <Loader /> :
                    <form id='Signupform'>
                        <h3>Edit Product</h3>
                        <label>Name</label>
                        <input className='signupInput' value={name} type="text" onChange={handleChange} name="name" placeholder="Full Name" />
                        <label>Category</label>
                        <select className='signupInput' name='category' onChange={handleChange} value={category}>
                            <option value="">Category</option>
                            {categories?.map((i, k) => {
                                return (
                                    <option key={k} value={i?._id} defaultValue={i._id === category}>{i?.name}</option>)
                            })}
                        </select>
                        <label>Price</label>
                        <input className='signupInput' type="number" min={10} onChange={handleChange} value={price} name="price" placeholder="Price" />
                        <label>Stock</label>
                        <input className='signupInput' type="number" min={10} onChange={handleChange} value={stock} name="stock" placeholder="Stock" />
                        <label>Weight</label>
                        <input className='signupInput' type="number" min={10} onChange={handleChange} value={weight} name="weight" placeholder="Grams" />


                        <label>Product Images (Change All or None)</label>
                        {(photo1 || photo2 || photo3) && <button className='btn btn-info text-light' onClick={unselectImages}>Unselect All Images</button>}
                        <label>IMAGE 1</label>
                        {(photo1 || product?.images) && <center><img alt='product' src={photo1 ? photo1 : product?.images[0]?.url} width='150px' /> </center>}
                        <input onChange={imageChange} name="image1" className='signupInput' type="file" accept='image/*' style={{ padding: "5px" }} />
                        <label>IMAGE 2</label>
                        {(photo2 || product?.images) && <center><img alt='product' src={photo2 ? photo2 : product?.images[1]?.url} width='150px' /></center>}
                        <input onChange={imageChange} name="image2" className='signupInput' type="file" accept='image/*' style={{ padding: "5px" }} />
                        <label>IMAGE 3</label>
                        {(photo3 || product?.images) && <center><img alt='product' src={photo3 ? photo3 : product?.images[2]?.url} width='150px' /></center>}
                        <input onChange={imageChange} name="image3" className='signupInput' type="file" accept='image/*' style={{ padding: "5px" }} />

                        <label>Description</label>
                        <textarea style={{ height: '200px', padding: '10px' }} className='signupInput' type="password" onChange={handleChange} value={description} name="description" placeholder="Description" />
                        <button className='loginSubmit' type="submit" onClick={editProduct}>UPDATE</button>
                    </form>
                }
            </div></>
    )
}

export default EditProduct