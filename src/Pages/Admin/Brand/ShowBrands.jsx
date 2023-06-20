import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from '../../../Components/utils/Notifications/Notifications';
import { ReactNotifications } from 'react-notifications-component';
import Loader from '../../../Components/utils/Loader/Loader'

const ShowBrands = () => {
    const [brands, setBrands] = useState([]);
    const [allBrands, setAllBrands] = useState([]);
    let [loading, setLoading] = useState(false)


    const searchBrands = (e) => {
        const key = e.target.value;
        if (!key) {
            setBrands(allBrands);
        } else {
            const filteredBrands = allBrands.filter((item) => {
                return item.name.toLowerCase().includes(key.toLowerCase()) ||
                    item.description.toLowerCase().includes(key.toLowerCase());
            });
            setBrands(filteredBrands);
        }
    }
    useEffect(() => {
        getBrands();
    }, [])

    const getBrands = async () => {
        setLoading(true)
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/brands`);
        setAllBrands(data);
        setBrands(data);
        setLoading(false)
    }

    const deleteBrand = async (id) => {
        try {
            setLoading(true)
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/brand/${id}`)
            await getBrands()
            setLoading(false)
            Notification('Success', 'Brand Deleted Successfully', 'success')
        } catch (error) {
            setLoading(false)
            Notification('Error', error?.response?.data?.message, 'danger');
        }
    }
    return (
        <div>
            <ReactNotifications />
            <div className="container-fluid">
                <div className='header mb-5'>
                    <h1 className="text-center text-black">Brands</h1>
                </div>
                <center>
                    <Link to="/admin/addBrand">
                        <button className='btn btn-primary mt-0'>Add New Brand</button>
                    </Link>
                </center>

                <div className='d-flex p-4'>
                    <input type="text" placeholder='Search Brands' onChange={searchBrands} className='signupInput' />
                </div>
                {loading ? <Loader /> :
                    <div className="d-flex flex-wrap align-items-center justify-content-evenly">
                        {brands?.map((i, ind) => {
                            return (<div key={ind} className="col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-sm-6 col-12 p-2">
                                <div className="card">
                                    <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="card-top" style={{ padding: '10px' }} alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{i.name}</h5>
                                        <p className="card-text">{i.description}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to={`/admin/editBrand/${i._id}`}>
                                                    <button type="button" className="btn btn-sm btn-primary">Edit</button>
                                                </Link>
                                            </div>
                                            <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteBrand(i._id)}>Delete</button>
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

export default ShowBrands