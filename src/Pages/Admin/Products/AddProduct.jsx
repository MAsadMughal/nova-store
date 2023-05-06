import React, { useEffect, useState } from 'react'
import "./Login.scss"
import Notification from '../../../Components/utils/Notifications/Notifications';
import axios from 'axios'
import { ReactNotifications } from 'react-notifications-component';
import Loader from "../../../Components/utils/Loader/Loader";
import { useNavigate } from 'react-router-dom';
const AddProducts = () => {
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
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories();
    }, [])
    const getCategories = async () => {
        const { data } = await axios.get(`${process.env.host}/api/v1/categories`)
        setCategories(data);
    }

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


    const Navigate = useNavigate();
    const { name, category, price, stock, weight, description, p1, p2, p3 } = product;

    //Reading Images
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

    //Images
    const imageChange = (e) => {
        setImages((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.files[0]
        }))
    }
    //Input Fields
    const handleChange = (e) => {
        setProduct((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }
    //Adding Product
    const addProduct = async (e) => {
        e.preventDefault();

        if (p1 && p2 && p3) {
            try {
                setLoading(true)
                await axios.post(`${process.env.host}/api/v1/addproduct`, product);
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
                Notification('Success', "Product Added Successfully.", 'success');
                setTimeout(() => {
                    Navigate('/admin/products');
                }, 2000);
            } catch (error) {
                setLoading(false);
                Notification('Error', error?.response?.data?.message, 'danger');
            }
        } else {
            Notification('Error', "Insert All 3 Images.", 'danger');
        }
    }
    return (<>
        <ReactNotifications />
        <div id='loginBody'>
            <div className="background">
                <div className="shape"></div>
                <div className="shape" ></div>
            </div>
            {loading ? <Loader /> :
                <form id='Signupform'>
                    <h3>Add New Product</h3>
                    <label>Name</label>
                    <input className='signupInput' type="text" value={name} onChange={handleChange} name="name" placeholder="Full Name" />
                    <label>Category</label>
                    <select className='signupInput' name='category' onChange={handleChange} value={category}>
                        <option value="" selected>Category</option>
                        {categories?.map((i) => {
                            return (
                                <option value={i?._id}>{i?.name}</option>)
                        })}
                    </select>
                    <label>Price</label>
                    <input className='signupInput' type="number" min={10} onChange={handleChange} value={price} name="price" placeholder="Price" />
                    <label>Stock</label>
                    <input className='signupInput' type="number" min={10} onChange={handleChange} value={stock} name="stock" placeholder="Stock" />
                    <label>Weight</label>
                    <input className='signupInput' type="number" min={10} onChange={handleChange} value={weight} name="weight" placeholder="Weight in Grams" />


                    <label>Product Images</label>
                    <label>IMAGE 1</label>
                    {photo1 && <center><img alt='product' src={photo1} width='150px' /> </center>}
                    <input onChange={imageChange} name="image1" className='signupInput' type="file" accept='image/*' style={{ padding: "5px" }} />
                    <label>IMAGE 2</label>
                    {photo2 && <center><img alt='product' src={photo2} width='150px' /></center>}
                    <input onChange={imageChange} name="image2" className='signupInput' type="file" accept='image/*' style={{ padding: "5px" }} />
                    <label>IMAGE 3</label>
                    {photo3 && <center><img alt='product' src={photo3} width='150px' /></center>}
                    <input onChange={imageChange} name="image3" className='signupInput' type="file" accept='image/*' style={{ padding: "5px" }} />


                    <label>Description</label>
                    <textarea style={{ height: '200px', padding: '10px' }} onChange={handleChange} value={description} name="description" className='signupInput' placeholder="Description" />
                    <button className='loginSubmit' onClick={addProduct} type="submit">Add Product</button>
                </form>
            }
        </div></>
    )
}

export default AddProducts