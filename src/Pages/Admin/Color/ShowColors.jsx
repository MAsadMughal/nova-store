import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from '../../../Components/utils/Notifications/Notifications';
import { ReactNotifications } from 'react-notifications-component';
import Loader from '../../../Components/utils/Loader/Loader'

const ShowColors = () => {
    const [colors, setColors] = useState([]);
    const [allColors, setAllColors] = useState([]);
    let [loading, setLoading] = useState(false)


    const searchColors = (e) => {
        const key = e.target.value;
        if (!key) {
            setColors(allColors);
        } else {
            const filteredColors = allColors.filter((item) => {
                return item.name.toLowerCase().includes(key.toLowerCase())
            });
            setColors(filteredColors);
        }
    }
    useEffect(() => {
        getColors();
    }, [])

    const getColors = async () => {
        setLoading(true)
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/colors`);
        setAllColors(data);
        setColors(data);
        setLoading(false)
    }

    const deleteColor = async (id) => {
        try {
            setLoading(true)
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/color/${id}`)
            await getColors()
            setLoading(false)
            Notification('Success', 'Color Deleted Successfully', 'success')
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
                    <h1 className="text-center text-black">Colors</h1>
                </div>
                <center>
                    <Link to="/admin/addColor">
                        <button className='btn btn-primary mt-0'>Add New Color</button>
                    </Link>
                </center>

                <div className='d-flex p-4'>
                    <input type="text" placeholder='Search Colors' onChange={searchColors} className='signupInput' />
                </div>
                {loading ? <Loader /> :
                    <div className="d-flex flex-wrap align-items-center justify-content-evenly">
                        {colors?.map((i, ind) => {
                            return (<div key={ind} className="col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-sm-6 col-12 p-2">
                                <div className="card">
                                    <div className="card-top" style={{ padding: '10px', backgroundColor: i?.name, borderBottom: '1px solid black' }} alt="..." ></div>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ color: i?.name }}>{i.name}</h5>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to={`/admin/editColor/${i._id}`}>
                                                    <button type="button" className="btn btn-sm btn-primary">Edit</button>
                                                </Link>
                                            </div>
                                            <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteColor(i._id)}>Delete</button>
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

export default ShowColors